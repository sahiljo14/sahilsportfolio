import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiences } from "@/data/experiences";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Experience
          </p>
          <h2 className="mt-2 text-4xl font-bold">Learning by Building</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Hands-on engineering work across backend systems, AI, embedded
            software, and modern web development.
          </p>
        </div>

        <ol className="relative ml-3 space-y-8 border-l border-border md:ml-0">
          {experiences.map((experience) => (
            <li key={experience.id} className="relative pl-8 md:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[0.4375rem] top-7 size-3.5 rounded-full border-4 border-background bg-primary"
              />

              <Card>
                <CardHeader>
                  <p className="text-sm font-medium text-primary">
                    {experience.period}
                  </p>
                  <CardTitle className="text-xl">{experience.title}</CardTitle>
                  <CardDescription>{experience.organization}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <p className="leading-7 text-muted-foreground">
                    {experience.description}
                  </p>

                  <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span aria-hidden="true" className="text-primary">
                          •
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <Badge key={technology} variant="secondary">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
