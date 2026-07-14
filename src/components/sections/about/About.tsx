import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section
      id="about"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            About
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Who I Am
          </h2>
        </div>

        <Card>
          <CardContent className="p-8">

            <p className="text-lg leading-8 text-muted-foreground">
              I&apos;m an Electronics & Communication Engineering student at
              MIT-WPU with a strong interest in backend engineering,
              distributed systems, AI applications and embedded software.
            </p>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I enjoy solving real-world engineering problems and constantly
              learning new technologies. My interests span backend systems,
              computer architecture, AI, Linux and modern web development.
            </p>

          </CardContent>
        </Card>

      </div>
    </section>
  );
}
