import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";
import { Download } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-16 px-6 py-20 lg:flex-row lg:justify-between">

        {/* Left */}

        <div className="max-w-2xl space-y-6">

          <p className="text-lg text-muted-foreground">
            Hi 👋 I&apos;m
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            {profile.name}
          </h1>

          <h2 className="text-2xl font-semibold text-muted-foreground">
            {profile.subtitle}
          </h2>

          <p className="text-lg leading-8 text-muted-foreground">
            {profile.description}
          </p>

          <div className="flex flex-wrap gap-4">

            <Button nativeButton={false} render={<a href="#projects" />} size="lg">
              View Projects
            </Button>

            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href={profile.resume} download />}
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>

          </div>

          <div className="flex gap-3">

            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={<a href={profile.github} target="_blank" rel="noreferrer" />}
            >
              <FaGithub className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={<a href={profile.linkedin} target="_blank" rel="noreferrer" />}
            >
              <FaLinkedin className="h-5 w-5" />
            </Button>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center">

          <div className="relative h-80 w-80 overflow-hidden rounded-full border bg-muted shadow-xl">
            <Image
              src={heroImage}
              alt="Sahil Joshi"
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
