import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold">Projects</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
