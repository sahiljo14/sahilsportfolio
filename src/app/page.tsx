import About from "@/components/sections/about/About";
import Contact from "@/components/sections/contact/Contact";
import Experience from "@/components/sections/experience/Experience";
import Hero from "@/components/sections/hero/Hero";
import Projects from "@/components/sections/projects/Projects";
import Skills from "@/components/sections/skills/Skills";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
