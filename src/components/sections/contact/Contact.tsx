import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Contact
        </p>
        <h2 className="mt-2 text-4xl font-bold">Let&apos;s Connect</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Find me on GitHub or LinkedIn to connect and follow my work.
        </p>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={profile.github} target="_blank" rel="noreferrer" />}
          >
            <FaGithub />
            GitHub
          </Button>
          <Button
            nativeButton={false}
            render={<a href={profile.linkedin} target="_blank" rel="noreferrer" />}
          >
            <FaLinkedin />
            LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
}
