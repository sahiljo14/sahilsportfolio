import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { parseTheme, themeInitScript } from "../src/lib/theme.ts";

test("Only supported theme preferences are accepted", () => {
  for (const value of [
    null,
    undefined,
    "system",
    "invalid",
    "LIGHT",
    "<script>",
  ])
    assert.equal(parseTheme(value), "system");
  assert.equal(parseTheme("light"), "light");
  assert.equal(parseTheme("dark"), "dark");
});
test("The pre-paint script resolves persistence, system defaults, and blocked storage", () => {
  for (const [saved, dark, blocked, pref, resolved] of [
    [null, true, false, "system", "dark"],
    [null, false, false, "system", "light"],
    ["light", true, false, "light", "light"],
    ["dark", false, false, "dark", "dark"],
    ["garbage", true, false, "system", "dark"],
    ["dark", false, true, "system", "light"],
  ]) {
    const root = { dataset: {} };
    vm.runInNewContext(themeInitScript, {
      document: { documentElement: root },
      localStorage: {
        getItem() {
          if (blocked) throw Error("disabled");
          return saved;
        },
      },
      matchMedia: () => ({ matches: dark }),
    });
    assert.equal(root.dataset.themePreference, pref);
    assert.equal(root.dataset.theme, resolved);
  }
});
