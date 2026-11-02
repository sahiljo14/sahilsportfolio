import type { MetadataRoute } from "next";
import { site } from "@/data/profile";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/story/", ...projects.map((project) => `/work/${project.slug}/`)].map(
    (path) => ({ url: `${site.url}${path}`, lastModified: "2026-11-02" }),
  );
}
