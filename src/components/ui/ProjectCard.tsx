import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
};

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  live,
}: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech}>
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {github && (
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={github} target="_blank" rel="noopener noreferrer" />}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        )}

        {live && (
          <Button
            nativeButton={false}
            render={<a href={live} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Live
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
