import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Projects
          </p>
          <h2 className="mt-2 text-4xl font-bold">Things I&apos;ve Built</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
