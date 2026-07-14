import { create } from "zustand";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

type UIStore = {
  activeSection: Section;

  setActiveSection: (section: Section) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  activeSection: "hero",

  setActiveSection: (section) =>
    set({
      activeSection: section,
    }),
}));