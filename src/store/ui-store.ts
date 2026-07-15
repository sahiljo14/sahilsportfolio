import { create } from "zustand";

export type Section =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

type UIStore = {
  activeSection: Section;
  isMenuOpen: boolean;

  setActiveSection: (section: Section) => void;
  setMenuOpen: (open: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) =>
  set({
    isMenuOpen: open,
  }),
  activeSection: "hero",

  setActiveSection: (section) =>
    set({
      activeSection: section,
    }),
}));