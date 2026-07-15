"use client"
import { useUIStore, type Section } from "@/store/ui-store";
const navigationItems = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function NavLinks({ className, onNavigate }: NavLinksProps) {
  const activeSection = useUIStore((state) => state.activeSection);
  const setActiveSection = useUIStore(
    (state) => state.setActiveSection
  );
  return (
    <nav aria-label="Primary navigation" className={className}>
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => {
            onNavigate?.();
            setActiveSection(item.href.replace("/#", "") as Section);
          }}
          className={`text-sm font-medium transition-colors ${
            activeSection === item.href.replace("/#", "")
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
