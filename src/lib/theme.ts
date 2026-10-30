export type ThemePreference = "system" | "light" | "dark";
export const themeStorageKey = "sahil-theme-v1";
export const themeColors = { light: "#eff1f1", dark: "#0d1110" };

export function parseTheme(value: string | null | undefined): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export const themeInitScript = `(function(){var p='system';try{var s=localStorage.getItem('${themeStorageKey}');if(s==='light'||s==='dark')p=s}catch(e){}var r=document.documentElement;r.dataset.themePreference=p;r.dataset.theme=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;})();`;

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const theme =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
  root.dataset.themePreference = preference;
  root.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
  window.dispatchEvent(new Event("portfolio-theme-change"));
}
