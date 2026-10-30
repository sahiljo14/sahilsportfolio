"use client";

import { useSyncExternalStore } from "react";
import {
  applyTheme,
  parseTheme,
  themeStorageKey,
  type ThemePreference,
} from "@/lib/theme";
import { Sun, Moon, Monitor } from "@/components/icons";

function getPreference() {
  return parseTheme(document.documentElement.dataset.themePreference);
}
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (getPreference() === "system") applyTheme("system");
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey || event.key === null)
      applyTheme(parseTheme(event.newValue));
  };
  window.addEventListener("portfolio-theme-change", onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystem);
  applyTheme(getPreference());
  return () => {
    window.removeEventListener("portfolio-theme-change", onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystem);
  };
}
const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeSwitch() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    () => "system",
  );
  function choose(value: ThemePreference) {
    try {
      localStorage.setItem(themeStorageKey, value);
    } catch {
      /* The current choice still works when persistence is blocked. */
    }
    applyTheme(value);
  }
  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`Use ${label.toLowerCase()} theme`}
          aria-pressed={preference === value}
          onClick={() => choose(value)}
          title={`${label} theme`}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
