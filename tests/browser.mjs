import { chromium, devices, webkit } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { themeColors, themeStorageKey } from "../src/lib/theme.ts";

const origin = process.env.PREVIEW_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/story/",
  "/work/diffrail/",
  "/work/lead-finder/",
  "/work/kairyo/",
  "/work/envirosense/",
  "/work/nudge/",
];
const screenshots = "artifacts/upgrade-screenshots";
await mkdir(screenshots, { recursive: true });
const report = {
  date: new Date().toISOString(),
  pages: [],
  errors: [],
  checks: [],
  metrics: {},
};
let expected404 = false;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
  colorScheme: "dark",
});
context.on("page", (p) => {
  p.on("pageerror", (e) => report.errors.push(e.message));
  p.on("console", (m) => {
    if (m.type() === "error" && !(expected404 && m.text().includes("404")))
      report.errors.push(m.text());
  });
});
const page = await context.newPage();
await page.addInitScript(() => {
  window.__portfolioMetrics = { lcp: 0, cls: 0 };
  new PerformanceObserver((list) => {
    for (const e of list.getEntries())
      window.__portfolioMetrics.lcp = e.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries())
      if (!e.hadRecentInput) window.__portfolioMetrics.cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
});
async function checkLayout(page, route, width) {
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  assert.ok(
    overflow.scroll <= overflow.width + 1,
    `${route} overflows at ${width}: ${JSON.stringify(overflow)}`,
  );
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(await page.locator("h1").count(), 1);
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
  assert.deepEqual(broken, []);
}
// Opens the first capture and works the viewer; touch profiles tap, others click.
// Leaves it open and asserts on the way, so a caller can inspect the open state.
async function checkLightbox(page, touch = false) {
  const press = (target) => (touch ? target.tap() : target.click());
  await page.goto(origin, { waitUntil: "networkidle" });
  const capture = page.locator("a.capture").first();
  await capture.scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);
  await press(capture);
  const lightbox = page.locator("dialog.lightbox");
  const image = lightbox.locator("img");
  const counter = lightbox.getByRole("status");
  await image.waitFor();
  await image.evaluate((img) => img.decode());
  assert.ok(await lightbox.evaluate((d) => d.matches(":modal")), "Lightbox is modal");
  assert.equal(await counter.innerText(), "1 of 3");
  const counterBox = await counter.boundingBox();
  assert.ok(counterBox.height < 40, "Lightbox counter stays on one line");

  await press(lightbox.getByRole("button", { name: "Next" }));
  await counter.getByText("2 of 3").waitFor();
  await press(lightbox.getByRole("button", { name: "Previous" }));
  await counter.getByText("1 of 3").waitFor();
  if (!touch) {
    await page.keyboard.press("ArrowRight");
    await counter.getByText("2 of 3").waitFor();
    await page.keyboard.press("ArrowLeft");
    await counter.getByText("1 of 3").waitFor();
  }
  await image.evaluate((img) => img.decode());

  await press(lightbox.getByRole("button", { name: "Zoom in" }));
  await lightbox.getByRole("button", { name: "Fit to screen" }).waitFor();
  // Zoomed in, every edge of the image has to be reachable.
  const reach = await lightbox.locator(".lightbox-view").evaluate((view) => {
    const frame = view.getBoundingClientRect();
    const img = view.querySelector("img");
    view.scrollTo(0, 0);
    const left = img.getBoundingClientRect().left - frame.left;
    const top = img.getBoundingClientRect().top - frame.top;
    view.scrollTo(1e6, 1e6);
    const right = img.getBoundingClientRect().right - frame.right;
    const bottom = img.getBoundingClientRect().bottom - frame.bottom;
    return { left, top, right, bottom };
  });
  assert.ok(reach.left >= -1 && reach.top >= -1, `Lightbox image clipped: ${JSON.stringify(reach)}`);
  assert.ok(reach.right <= 1 && reach.bottom <= 1, `Lightbox image clipped: ${JSON.stringify(reach)}`);
  await press(lightbox.getByRole("button", { name: "Fit to screen" }));

  await press(lightbox.getByRole("button", { name: "Close" }));
  await image.waitFor({ state: "detached" });
  assert.ok(
    await capture.evaluate((link) => link === document.activeElement),
    "Focus returns to the capture after Close",
  );
  assert.ok(
    Math.abs((await page.evaluate(() => window.scrollY)) - scrollY) < 2,
    "Closing the lightbox keeps the scroll position",
  );
  await press(capture);
  await image.waitFor();
  await page.keyboard.press("Escape");
  await image.waitFor({ state: "detached" });
  assert.ok(
    await capture.evaluate((link) => link === document.activeElement),
    "Focus returns to the capture after Escape",
  );
  await press(capture);
  await image.waitFor();
}
try {
  for (const theme of ["dark", "light"]) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [1920, 1440, 1280, 1024, 768, 390, 375, 320]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      for (const route of routes) {
        const res = await page.goto(`${origin}${route}`, {
          waitUntil: "networkidle",
        });
        assert.equal(res.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        await checkLayout(page, route, width);
        if (route === "/") {
          // Both hero actions are on screen before any scrolling, at every width.
          const height = page.viewportSize().height;
          for (const action of await page.locator(".hero .button").all()) {
            const box = await action.boundingBox();
            assert.ok(
              box.y + box.height <= height,
              `Hero action below the fold at ${width}: ${box.y + box.height} > ${height}`,
            );
          }
        }
        if (
          (width === 1440 || width === 390) &&
          (route === "/" ||
            route === "/work/kairyo/" ||
            route === "/work/diffrail/")
        ) {
          for (const img of await page.locator("img:visible").all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate((el) => el.decode());
          }
          await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          const name = route === "/" ? "home" : route.split("/")[2];
          await page.screenshot({
            path: `${screenshots}/${name}-${theme}-${width}.png`,
            fullPage: true,
          });
          if (route === "/")
            await page.screenshot({
              path: `${screenshots}/home-${theme}-${width}-fold.png`,
            });
        }
        if (width === 1440 || width === 390) {
          const a11y = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();
          report.pages.push({
            route,
            theme,
            width,
            violations: a11y.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => n.target),
            })),
          });
        }
      }
    }
  }
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").innerText(), "Skip to content");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
  report.checks.push("Keyboard skip link focuses main content");
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page
    .getByRole("button", { name: "Use light theme", exact: true })
    .click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  assert.equal(
    await page.evaluate((key) => localStorage.getItem(key), themeStorageKey),
    "light",
  );
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  assert.equal(
    await page
      .getByRole("button", { name: "Use light theme", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.goto(`${origin}/work/kairyo/`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page
    .getByRole("button", { name: "Use dark theme", exact: true })
    .click();
  await page.emulateMedia({ colorScheme: "light" });
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page
    .getByRole("button", { name: "Use system theme", exact: true })
    .click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForFunction(
    () => document.documentElement.dataset.theme === "dark",
  );
  assert.equal(
    await page.locator('meta[name="theme-color"]').getAttribute("content"),
    themeColors.dark,
  );
  await page.evaluate(
    (key) => localStorage.setItem(key, "invalid"),
    themeStorageKey,
  );
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.locator("html").getAttribute("data-theme-preference"),
    "system",
  );
  const companion = await context.newPage();
  await companion.goto(origin, { waitUntil: "networkidle" });
  await page
    .getByRole("button", { name: "Use light theme", exact: true })
    .click();
  await companion.waitForFunction(
    () => document.documentElement.dataset.theme === "light",
  );
  await companion.close();
  await page
    .getByRole("button", { name: "Use system theme", exact: true })
    .click();
  const isolated = await browser.newContext({ colorScheme: "dark" });
  await isolated.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "getItem", {
      value() {
        throw new Error("blocked");
      },
    });
    Object.defineProperty(Storage.prototype, "setItem", {
      value() {
        throw new Error("blocked");
      },
    });
  });
  const blocked = await isolated.newPage();
  const blockedErrors = [];
  blocked.on("pageerror", (e) => blockedErrors.push(e.message));
  await blocked.goto(origin, { waitUntil: "networkidle" });
  await blocked
    .getByRole("button", { name: "Use light theme", exact: true })
    .click();
  assert.equal(
    await blocked.locator("html").getAttribute("data-theme"),
    "light",
  );
  assert.equal(
    await blocked
      .getByRole("button", { name: "Use light theme", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.deepEqual(blockedErrors, []);
  await isolated.close();
  await page.goto(origin, { waitUntil: "networkidle" });
  report.checks.push(
    "Themes: system default, explicit override, persistence, navigation, live OS change, cross-tab sync, invalid storage and blocked storage",
  );
  const contactEmail = (
    await page.locator(".email-link").getAttribute("href")
  ).slice(7);
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await page.getByRole("status").filter({ hasText: "Copied" }).waitFor();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    contactEmail,
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("denied");
    };
  });
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Couldn’t copy. Use the email link." })
    .waitFor();
  report.checks.push("Copy email success and denied-permission fallback");
  await page.goto(`${origin}/work/kairyo/`, { waitUntil: "networkidle" });
  const slider = page.getByRole("slider", { name: "Reveal the result" });
  await slider.focus();
  await slider.press("End");
  assert.equal(await slider.inputValue(), "100");
  await slider.press("Home");
  assert.equal(await slider.inputValue(), "0");
  report.checks.push("Image comparison supports keyboard and full 0–100 range");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await checkLightbox(page);
    const a11y = await new AxeBuilder({ page })
      .include("dialog.lightbox")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    assert.deepEqual(a11y.violations.map((v) => v.id), []);
    await page.keyboard.press("Escape");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  report.checks.push(
    "Lightbox opens from a capture, keeps keyboard, zoom and focus working, and passes axe",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  report.checks.push("Reduced motion disables smooth scrolling and animation");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const links = new Set();
  for (const route of routes) {
    await page.goto(`${origin}${route}`, { waitUntil: "networkidle" });
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((as) => as.map((a) => a.href)))
      if (href.startsWith(origin)) links.add(href);
  }
  for (const href of links) {
    const url = new URL(href);
    const res = await page.request.get(url.href);
    assert.equal(res.status(), 200, href);
    if (url.hash) {
      await page.goto(url.href, { waitUntil: "domcontentloaded" });
      assert.equal(
        await page
          .locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`)
          .count(),
        1,
        href,
      );
    }
  }
  report.checks.push(`${links.size} internal destinations and anchors resolve`);
  expected404 = true;
  const compressed = await page.request.get(origin, {
    headers: { "Accept-Encoding": "gzip" },
  });
  assert.equal(compressed.headers()["content-encoding"], "gzip");
  assert.ok((await compressed.text()).includes("main-content"));
  const identity = await page.request.get(origin, {
    headers: { "Accept-Encoding": "gzip;q=0" },
  });
  assert.equal(identity.headers()["content-encoding"], undefined);
  report.checks.push(
    "Static text compression negotiates correctly and keeps decoded content intact",
  );
  const missing = await page.goto(`${origin}/missing-page/`);
  assert.equal(missing.status(), 404);
  await page
    .getByRole("heading", { name: "Nothing here. Probably something I haven’t built yet." })
    .waitFor();
  const traversal = await page.request.get(`${origin}/%2e%2e%2fpackage.json`);
  assert.equal(traversal.status(), 404);
  await page.waitForLoadState("networkidle");
  expected404 = false;
  report.checks.push("Custom 404 and preview path traversal protection");
  await page.goto(origin, { waitUntil: "networkidle" });
  report.metrics = await page.evaluate(() => ({
    ...window.__portfolioMetrics,
    navigation: performance.getEntriesByType("navigation")[0]?.toJSON(),
    resources: performance.getEntriesByType("resource").map((r) => ({
      name: r.name,
      transfer: r.transferSize,
      size: r.decodedBodySize,
    })),
  }));
  assert.ok(await page.locator("link[rel=canonical]").getAttribute("href"));
  report.checks.push("Canonical metadata and social preview present");
} finally {
  await browser.close();
  await writeFile(
    "artifacts/browser-report.json",
    JSON.stringify(report, null, 2),
  );
}
assert.deepEqual(report.errors, [], "Browser console errors");
assert.deepEqual(
  report.pages.filter((p) => p.violations.length),
  [],
  "Accessibility findings (see artifacts/browser-report.json)",
);
for (const [name, engine] of [["webkit", webkit]]) {
  for (const theme of ["dark", "light"]) {
    const b = await engine.launch();
    try {
      const p = await b.newPage({
        viewport: { width: 390, height: 844 },
        colorScheme: theme,
      });
      await p.goto(origin, { waitUntil: "networkidle" });
      await checkLayout(p, "/", 390);
      for (const img of await p.locator("img:visible").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => el.decode());
      }
      await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await p.screenshot({
        path: `${screenshots}/home-${name}-${theme}-390.png`,
        fullPage: true,
      });
      await p
        .getByRole("button", {
          name: `Use ${theme === "dark" ? "light" : "dark"} theme`,
          exact: true,
        })
        .click();
      assert.equal(
        await p.locator("html").getAttribute("data-theme"),
        theme === "dark" ? "light" : "dark",
      );
      console.log(`${name}: ${theme} mobile layout and theme switch passed`);
      for (const profile of ["iPhone 13", "iPhone 13 landscape", "iPad Mini"]) {
        const touch = await b.newContext({ ...devices[profile], colorScheme: theme });
        const tp = await touch.newPage();
        await checkLightbox(tp, true);
        await touch.close();
      }
      console.log(`${name}: ${theme} lightbox passed on touch profiles`);
    } finally {
      await b.close();
    }
  }
}
// The console photo stays inside its panel, with the board and buttons in frame.
for (const engine of [chromium, webkit]) {
  const b = await engine.launch();
  const p = await b.newPage();
  await p.goto(origin);
  for (const width of [1920, 1440, 1280, 1101, 1100, 1024, 768, 390, 375, 320]) {
    await p.setViewportSize({ width, height: 900 });
    const { panel, copy, img } = await p.evaluate(() => {
      const box = (s) => document.querySelector(s).getBoundingClientRect().toJSON();
      return { panel: box(".handheld"), copy: box(".handheld-copy"), img: box(".handheld-photo img") };
    });
    const at = `at ${width}px`;
    const near = (x, y, what) => assert.ok(Math.abs(x - y) <= 1, `${what} ${at}: ${x} vs ${y}`);
    assert.ok(img.top >= panel.top - 1 && img.bottom <= panel.bottom + 1, `Photo inside the panel ${at}`);
    near(img.left >= copy.right - 1 ? img.right : img.width, img.left >= copy.right - 1 ? panel.right : panel.width, "Photo meets the panel edge");
    if (width > 1100) {
      near(img.top, copy.top, "Tops align");
      near(img.bottom, copy.bottom, "Bottoms align");
    }
    const ratio = img.width / img.height;
    assert.ok(ratio >= 0.855 && ratio <= 1, `Whole board and every button in frame ${at}: ${ratio}`);
  }
  await b.close();
}
// The demo stays a link until pressed, and nothing reaches YouTube before that.
for (const engine of [chromium, webkit]) {
  const b = await engine.launch();
  const p = await b.newPage();
  const requests = [];
  await p.route(/youtube/, (route) => {
    requests.push(route.request().url());
    return route.fulfill({ contentType: "text/html", body: "<title>Player</title>" });
  });
  for (const width of [1440, 390]) {
    await p.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await p.goto(origin, { waitUntil: "networkidle" });
    await p.goto(`${origin}/work/nudge/`, { waitUntil: "networkidle" });
    assert.deepEqual(requests, [], "Nothing loads from YouTube before Play");
    const play = p.getByRole("link", { name: /^Play video/ });
    const before = await play.boundingBox();
    assert.ok(Math.abs(before.width / before.height - 9 / 16) < 0.01, "Player keeps 9:16");
    if (width < 700) await play.click();
    else {
      await play.focus();
      await p.keyboard.press("Enter");
    }
    const player = p.getByTitle("Nudge Android app demo");
    await player.waitFor();
    assert.match(await player.getAttribute("src"), /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
    assert.ok(await player.evaluate((el) => el === document.activeElement), "Focus moves to the player");
    assert.equal(requests.length, 1);
    assert.equal(
      new URL(await p.getByRole("link", { name: "Watch on YouTube" }).getAttribute("href")).hostname,
      "www.youtube.com",
    );
    requests.length = 0;
  }
  await b.close();
}
report.checks.push("Video demo loads nothing from YouTube until pressed, then focuses the player");

const nojs = await chromium.launch();
try {
  const c = await nojs.newContext({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto(origin);
  assert.ok(await p.getByRole("heading", { level: 1 }).isVisible());
  await p.goto(`${origin}/work/kairyo/`);
  assert.ok(
    await p
      .getByRole("heading", { name: "Why I built it", exact: true })
      .isVisible(),
  );
  // Without the lightbox a capture is still a working link to its image.
  await p.goto(origin);
  const image = await p.request.get(
    new URL(await p.locator("a.ao-main").getAttribute("href"), origin).href,
  );
  assert.equal(image.status(), 200);
  // Without JavaScript the video is a link to YouTube.
  await p.goto(`${origin}/work/nudge/`);
  assert.equal(
    await p.getByRole("link", { name: /^Play video/ }).getAttribute("href"),
    "https://www.youtube.com/shorts/wadkYV90MEw",
  );
} finally {
  await nojs.close();
}
console.log(
  `Passed: ${routes.length} pages × 8 widths × 2 themes, accessibility, links, keyboard, clipboard, comparison, reduced motion, 404, Chromium and WebKit, and static content without JavaScript.`,
);

report.checks.push(
  "WebKit mobile smoke check",
  "WebKit lightbox on iPhone, iPhone landscape and iPad profiles",
  "Content and case studies available without JavaScript",
);
await writeFile(
  "artifacts/browser-report.json",
  JSON.stringify(report, null, 2),
);
