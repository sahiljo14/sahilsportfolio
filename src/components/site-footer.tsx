import { ArrowUpRight } from "@/components/icons";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <span>Sahil Joshi, {profile.location}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github}>
          GitHub <ArrowUpRight />
        </a>
      </div>
    </footer>
  );
}
