"use client";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "@/store/ui-store";

import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const isOpen = useUIStore((state) => state.isMenuOpen);

const setMenuOpen = useUIStore((state) => state.setMenuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        onClick={() => setMenuOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-y border-border bg-background/95 px-6 py-6 shadow-lg backdrop-blur md:hidden"
        >
          <NavLinks
            className="flex flex-col gap-5"
            onNavigate={closeMenu}
          />

          <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
            <Button
              nativeButton={false}
              render={<a href={profile.resume} download />}
              size="lg"
              onClick={closeMenu}
            >
              Resume
            </Button>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
