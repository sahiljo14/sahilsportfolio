import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { projects, built } from "../src/data/projects.ts";
import { profile, asset } from "../src/data/profile.ts";

const states = [
  "Alpha, not publicly released",
  "In use internally",
  "Public release",
  "Public code",
  "In progress",
];

test("Every case study has evidence, unique routing, and usable content", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    for (const field of ["name", "dek", "role", "unfinished", "learned"])
      assert.ok(p[field]?.length > 0, `${p.slug}: ${field}`);
    assert.ok(states.includes(p.state), `${p.slug}: state ${p.state}`);
    assert.ok(p.stack.length && p.decisions.length && p.origin.length);
    assert.ok(p.pipeline.length >= 3, `${p.slug}: pipeline`);
    for (const link of p.links) assert.equal(new URL(link.url).protocol, "https:");
    for (const f of p.figures) {
      assert.ok(existsSync(`public${f.src}`), f.src);
      assert.ok(f.alt.length > 20, `${f.src}: alt`);
      // Every image is seamed to its provenance.
      assert.match(f.caption, /^(Real capture|Real photo|Illustration)/, f.src);
    }
  }
  for (const item of built) {
    assert.ok(states.includes(item.state), item.name);
    if (item.href.startsWith("/"))
      assert.ok(projects.some((p) => item.href === `/work/${p.slug}/`));
  }
});

// Terms that must never ship (confidential names, upstream project, private
// hosts) live in a local, gitignored .private-denylist so this public test
// never contains them itself.
const denylist = existsSync(".private-denylist")
  ? readFileSync(".private-denylist", "utf8").split("\n").map((t) => t.trim().toLowerCase()).filter(Boolean)
  : [];

test("Public content keeps private, confidential and upstream names out", (t) => {
  const sources = [
    JSON.stringify({ projects, built, profile }),
    readFileSync("src/app/page.tsx", "utf8"),
    readFileSync("src/app/story/page.tsx", "utf8"),
    readFileSync("src/app/layout.tsx", "utf8"),
  ].join("\n").toLowerCase();
  if (!denylist.length) t.diagnostic("no local .private-denylist; skipping name checks");
  for (const term of denylist) assert.ok(!sources.includes(term), "denylisted term in public content");
  assert.doesNotMatch(sources, /your_|localhost|127\.0\.0\.1/);
  const ao = projects.find((p) => p.slug === "agent-orchestrator");
  assert.equal(ao.links.length, 0, "private repository is never linked");
  assert.match(ao.state, /not publicly released/);
  for (const slug of ["envirosense", "nudge"])
    assert.match(projects.find((p) => p.slug === slug).role, /teammate/);
  assert.doesNotMatch(sources, /\d{1,3},\d{3} (unit )?tests/, "no stale test counts");
  assert.equal(profile.email, "sahiljo.work@gmail.com");
});

test("Deployment assets keep the base path prefix", () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = "/sahilsportfolio";
  try {
    assert.equal(
      asset("/images/kairyo.webp"),
      "/sahilsportfolio/images/kairyo.webp",
    );
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});

test("Production export includes complete static pages and SEO artifacts", () => {
  const routes = [
    "index.html",
    "story/index.html",
    ...projects.map((p) => `work/${p.slug}/index.html`),
  ];
  for (const p of [...routes, "404.html", "sitemap.xml", "robots.txt"])
    assert.ok(existsSync(`out/${p}`), p);
  for (const route of routes) {
    const html = readFileSync(`out/${route}`, "utf8");
    assert.match(html, /property="og:image"/, `${route}: social image`);
    assert.match(html, /name="twitter:image"/, `${route}: Twitter image`);
    assert.match(html, /rel="canonical"/, `${route}: canonical URL`);
    for (const term of denylist)
      assert.ok(!html.toLowerCase().includes(term), `${route}: denylisted term`);
  }
  assert.match(readFileSync("out/index.html", "utf8"), /application\/ld\+json/);
});
