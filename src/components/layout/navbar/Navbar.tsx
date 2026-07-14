import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import Link from "next/link";

import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Sahil Joshi
        </Link>

        <NavLinks className="hidden items-center gap-6 md:flex" />

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<a href={profile.resume} download />}
          >
            Resume
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
