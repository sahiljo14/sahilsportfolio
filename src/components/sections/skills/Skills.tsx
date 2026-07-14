import { skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Skills
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Technologies I Use
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {skillCategories.map((category) => (

            <Card key={category.title}>

              <CardContent className="space-y-4 p-6">

                <h3 className="text-xl font-semibold">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">

                  {category.skills.map((skill) => (

                    <Badge key={skill}>
                      {skill}
                    </Badge>

                  ))}

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>
    </section>
  );
}