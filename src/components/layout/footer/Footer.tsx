import { profile } from "@/data/profile";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  {
    href: profile.github,
    label: "GitHub",
    icon: FaGithub,
    external: true,
  },
  {
    href: profile.linkedin,
    label: "LinkedIn",
    icon: FaLinkedin,
    external: true,
  },
  {
    href: `mailto:${profile.email}`,
    label: "Email",
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>

        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          {footerLinks.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
