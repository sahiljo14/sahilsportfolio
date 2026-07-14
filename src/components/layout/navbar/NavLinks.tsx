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
  return (
    <nav aria-label="Primary navigation" className={className}>
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
