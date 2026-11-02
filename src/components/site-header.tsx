import { asset } from "@/data/profile";
import { ThemeSwitch } from "@/components/theme-switch";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a className="wordmark" href={asset("/")}>
          Sahil Joshi
        </a>
        <nav aria-label="Main">
          <a href={asset("/story/")}>Story</a>
          <a href={asset("/work/diffrail/")}>Diffrail</a>
          <a href={asset("/#built")}>Built</a>
          <a href={asset("/#contact")}>Contact</a>
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  );
}
