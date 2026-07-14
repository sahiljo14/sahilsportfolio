import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {project.github && (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        )}

        {project.live && (
          <Button
            nativeButton={false}
            render={<a href={project.live} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Live
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
