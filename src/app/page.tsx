import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { BoardDrawing } from "@/components/board-drawing";
import { CopyEmail } from "@/components/copy-email";
import { EnviroDiagram } from "@/components/enviro-diagram";
import { LeadFlow } from "@/components/lead-flow";
import { Lightbox } from "@/components/lightbox";
import { RiscvDatapath } from "@/components/riscv-datapath";
import { Capture } from "@/components/shot";
import { asset, profile } from "@/data/profile";
import { projects } from "@/data/projects";

const ao = projects.find((p) => p.slug === "agent-orchestrator")!;
const leadFinder = projects.find((p) => p.slug === "lead-finder")!;
const aoFigure = (name: string) =>
  ao.figures.find((f) => f.src.endsWith(`${name}.webp`))!;
const aoAgents = aoFigure("ao-agents");
const aoPlan = aoFigure("ao-plan");
const aoNeedsYou = aoFigure("ao-needs-you");

const oneMinute = [
  { age: "~11", text: "Wanted a gaming PC. Got obsessed with what goes inside one.", href: "/story/#the-pc" },
  { age: "~12", text: "Tried YouTube and affiliate marketing to pay for it.", href: "/story/#paying-for-it" },
  { age: "~13", text: "Built it. Found Ethereum. Taught myself Python.", href: "/story/#building-it" },
  { age: "18", text: "Soldered together my own handheld game console.", href: "/story/#the-handheld" },
  { age: "Now", text: "Building Agent Orchestrator. One of three co-founders of Kramiva.", href: "#orchestrator" },
];

const distros = ["Arch", "Ubuntu", "Manjaro", "EndeavourOS", "Pop!_OS", "CasaOS", "ZimaOS"];

// A chapter's age, set large: this is the site's chronology.
function Age({ pre, n }: { pre?: string; n: string }) {
  return (
    <p className="age">
      {pre ? <span>{pre}</span> : null} <b>{n}</b>
    </p>
  );
}

function Img({
  src,
  alt,
  w,
  h,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      className={className}
      src={asset(src)}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      priority={priority}
    />
  );
}

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* 1. Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>I wanted a gaming&nbsp;PC.</span>{" "}
            <em>Everything else followed.</em>
          </h1>
          <p className="hero-lede">
            I’m Sahil Joshi. A surprising amount of my life traces back to one
            want: hardware, money experiments at twelve, crypto, Python, Linux,
            and now building software products.
          </p>
          <div className="actions">
            <a className="button" href={asset("/story/")}>
              Read the story
            </a>
            <a className="button button-quiet" href="#orchestrator">
              See what I’m building
            </a>
          </div>
          <p className="identity">
            Electronics &amp; Communication Engineering at MIT-WPU, Pune.
            Co-founder of Kramiva Technologies.
          </p>
        </div>
        <figure className="hero-photo">
          <Img
            src="/images/console-tall.webp"
            alt="A handheld game console built on green perfboard: a small TFT screen at the top, an ESP32 board in the middle, and hand-labelled buttons below."
            w={1600}
            h={2046}
            priority
            sizes="(max-width: 760px) 100vw, 42vw"
          />
          <figcaption>
            The ESP32 handheld I built at 18. The screen’s off here. It did play
            Contra.
          </figcaption>
        </figure>
      </section>

      {/* 2. The one-minute version */}
      <section className="minute wrap g12" aria-labelledby="minute-title">
        <h2 id="minute-title">The one-minute version</h2>
        <ol>
          {oneMinute.map((row) => (
            <li key={row.age}>
              <a href={row.href.startsWith("/") ? asset(row.href) : row.href}>
                <span className="minute-age">{row.age}</span>
                <span className="minute-text">{row.text}</span>
              </a>
            </li>
          ))}
          <li className="minute-next">
            <span className="minute-age">Next</span>
            <span className="minute-text">Not written yet.</span>
          </li>
        </ol>
      </section>

      {/* 3. The machine */}
      <section className="machine wrap g12" aria-labelledby="machine-title">
        <Age pre="Around" n="11" />
        <h2 id="machine-title">The PC I didn’t have.</h2>
        <div className="machine-copy">
          <p>
            No gaming PC, no PlayStation. So around seventh grade I started
            watching PC-building videos, and then I couldn’t stop: CPUs, GPUs,
            benchmarks, motherboards, cooling, which parts worked together. I
            planned builds I had no money for.
          </p>
          <p className="statement">
            Somewhere in there, it stopped being about the games. I’d fallen
            for the hardware itself.
          </p>
          <p>
            I built my first PC at around thirteen, and I’ve been swapping
            parts in it ever since.
          </p>
          <a className="text-link" href={asset("/story/#the-pc")}>
            Read the chapter
          </a>
        </div>
        <BoardDrawing />
      </section>

      {/* 4. Experiments */}
      <section className="experiments wrap" aria-labelledby="exp-title">
        <header className="exp-head g12">
          <h2 id="exp-title">Then I started trying things.</h2>
          <p>
            A PC costs money, and I was eleven. Most of what came next began as
            a way to pay for something, and turned into something else.
          </p>
        </header>
        <div className="exp-grid g12">
          <article className="exp exp-eth">
            <Age pre="From around" n="13" />
            <h3>Ethereum</h3>
            <p className="statement">
              I thought it could make me money. Then the technology got more
              interesting than the money.
            </p>
            <p>
              Whitepapers, trading, DeFi protocols, investing in other coins,
              mining, and one attempt at my own token.
            </p>
            <p className="statement">
              I received an airdrop and sold the tokens for about $10,000.
            </p>
          </article>
          <article className="exp exp-yt">
            <Age pre="Age" n="11–12" />
            <h3>YouTube</h3>
            <p>I made technology videos. Years later, around nineteen, Valorant montages.</p>
          </article>
          <article className="exp exp-aff">
            <Age pre="Around" n="12" />
            <h3>Affiliate marketing</h3>
            <p>A VPN service and some health products. The point wasn’t the earnings. It was trying.</p>
          </article>
          <article className="exp exp-py">
            <Age pre="Age" n="13–14" />
            <div>
              <h3>Python, and a Discord bot</h3>
              <p>
                Self-taught from YouTube and trial and error. The first thing I
                made because I wanted it: a bot that answered keywords with GIFs.
                I wanted it to exist, so I learned how.
              </p>
            </div>
          </article>
          <article className="exp exp-linux g12">
            <div>
              <h3>Linux, servers, and taking tools apart</h3>
              <p>
                Self-hosting, my own infrastructure, C++, shell scripts, FFmpeg.
                Curiosity, not a list of things I’ve mastered.
              </p>
            </div>
            <ul className="distros" aria-label="Linux distributions I’ve used">
              {distros.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 5. The handheld */}
      <section className="handheld" id="the-handheld" aria-labelledby="handheld-title">
        <div className="handheld-copy">
          <Age pre="Age" n="18" />
          <h2 id="handheld-title">Then I built the machine myself.</h2>
          <p>
            In my second year of engineering I built a handheld NES console
            around an ESP32, because I liked retro games, wanted to get into
            electronics, and it sounded cool. It worked: Contra, Super Mario.
            The hard parts were the soldering and the firmware.
          </p>
          <p className="statement">
            As a kid, I wanted a machine to play games on. Years later, I was
            soldering one together.
          </p>
        </div>
        <figure className="handheld-photo">
          <Img
            src="/images/console-detail.webp"
            alt="Close-up of the handheld console: the ESP32 development board soldered onto green perfboard, with hand-labelled SE, ST, M, B and arrow buttons below it."
            w={1500}
            h={1682}
            sizes="(max-width: 760px) 100vw, 60vw"
          />
          <figcaption>The ESP32, the hand-labelled buttons, and a lot of solder.</figcaption>
        </figure>
      </section>

      {/* 6. The turning point */}
      <section className="turn wrap g12" aria-labelledby="turn-title">
        <h2 id="turn-title">
          For a long time, a complete product felt like something other people
          made.
        </h2>
        <div className="turn-note">
          <h3>An internship changed that.</h3>
          <p>
            I’m four months into an internship, working on an end-to-end
            application. The details are confidential. What it did for me
            isn’t: taking real software from idea to working implementation
            showed me I could build far more ambitious things than I’d
            believed.
          </p>
        </div>
        <div className="turn-note">
          <h3>So, an agency?</h3>
          <p>
            I started thinking seriously about a software agency of my own.
            Which raised a practical question: how could a small team do that
            much work? That question led me to AI coding agents.
          </p>
        </div>
      </section>

      {/* 7. Agent Orchestrator */}
      <section className="ao" id="orchestrator" aria-labelledby="ao-title">
        <div className="ao-panel">
          <header className="ao-head">
            <h2 id="ao-title">Agent Orchestrator</h2>
            <div className="ao-sub">
              <p className="ao-when">What I’m building, since July 2026.</p>
              <p className="ao-dek">
                I wanted several AI coding agents working on one project, with me
                still in charge. I couldn’t find a tool that worked that way, so I
                started building one for my own agency. The more I built, the
                clearer it got that the problem wasn’t just mine.
              </p>
            </div>
          </header>
          <figure className="ao-stage">
            <div className="ao-collage">
              <Capture figure={aoAgents} className="ao-main" sizes="(max-width: 760px) 300vw, 76vw" />
              <Capture figure={aoPlan} className="ao-float ao-float-plan" sizes="(max-width: 760px) 165vw, 40vw" />
              <Capture figure={aoNeedsYou} className="ao-float ao-float-needs" sizes="(max-width: 760px) 100vw, 26vw" />
            </div>
            <figcaption>
              Real captures from the demo build of 30 October 2026, with a sample
              project and scripted agents: one request running across four
              coding agents, a plan waiting for approval, and the panel that puts
              what needs you first. Select one to enlarge it.
            </figcaption>
          </figure>
          <div className="ao-points">
            {ao.decisions.slice(0, 3).map((d) => (
              <div key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
          <div className="ao-foot">
            <p>
              {ao.state}. Electron, React, TypeScript, SQLite. I started it,
              designed the orchestration layer, and wrote all 13 of its
              architecture decision records.
            </p>
            <a className="button button-on-dark" href={asset("/work/agent-orchestrator/")}>
              Read the case study
            </a>
          </div>
        </div>
      </section>

      {/* 8. Lead Finder */}
      <section className="lead wrap" aria-labelledby="lead-title">
        <div className="lead-head g12">
          <h2 id="lead-title">Lead Finder</h2>
          <div className="lead-copy">
            <p className="ao-when">Since September 2026</p>
            <p className="lead-dek">
              An agency needs clients, and finding them by hand is slow. Same
              pattern as always: a goal, a repetitive process, an urge to automate
              it.
            </p>
            <p>
              It’s an internal tool that runs on our own server. Nothing is sent
              until a person approves it, and it starts in dry-run mode.
            </p>
            <a className="text-link" href={asset("/work/lead-finder/")}>
              How it’s built
            </a>
          </div>
        </div>
        <LeadFlow steps={leadFinder.pipeline} />
      </section>

      {/* 9. Kramiva */}
      <section className="kramiva wrap g12" aria-labelledby="kramiva-title">
        <h2 id="kramiva-title">
          Kramiva <span>Technologies</span>
        </h2>
        <div>
          <p className="statement">One of three co-founders. That’s me.</p>
          <p>
            Kramiva is a founder-led software company: it builds its own
            products and software for clients. It’s early, and I’d rather say
            that plainly than dress it up.
          </p>
          <a className="text-link" href={profile.kramiva}>
            kramiva.com <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* 10. Other builds */}
      <section className="built wrap" id="built" aria-labelledby="built-title">
        <h2 id="built-title">Other things I’ve built</h2>
        <div className="built-grid g12">
          <a className="tile tile-kairyo" href={asset("/work/kairyo/")}>
            <span className="tile-media">
              <Img className="only-light" src="/images/kairyo-light.webp" alt="Kairyo’s desktop app in its light theme, with model selection and archive options." w={1280} h={712} sizes="(max-width: 760px) 100vw, 56vw" />
              <Img className="only-dark" src="/images/kairyo.webp" alt="Kairyo’s desktop app in its dark theme, with model selection and archive options." w={1280} h={710} sizes="(max-width: 760px) 100vw, 56vw" />
            </span>
            <span className="tile-text">
              <strong>Kairyo</strong>
              <span>A desktop app that turns low-resolution manga into an AI-upscaled archive: job queue, tiled inference, CPU fallback. Python, PyQt6, PyTorch.</span>
              <span className="state">Public release, built solo</span>
            </span>
          </a>
          <a className="tile tile-enviro" href={asset("/work/envirosense/")}>
            <span className="tile-media tile-diagram">
              <EnviroDiagram />
            </span>
            <span className="tile-text">
              <strong>EnviroSense</strong>
              <span>Environmental readings from a sensor (or its simulator) over MQTT into PostgreSQL and a React dashboard.</span>
              <span className="state">Public code, with a teammate</span>
            </span>
          </a>
          <a className="tile tile-nudge" href={asset("/work/nudge/")}>
            <span className="tile-media tile-video">
              <Img
                src="/images/nudge-demo.webp"
                alt="Nudge on an Android phone, splitting one typed message into two tasks."
                w={1080}
                h={1920}
                sizes="(max-width: 760px) 100vw, 40vw"
              />
            </span>
            <span className="tile-text">
              <strong>Nudge</strong>
              <span>Finds the deadline buried in an English, Hinglish or Marathi message and keeps it as a task. An on-device Android app in Flutter.</span>
              <span className="state">In closed testing on Google Play, with a teammate</span>
            </span>
          </a>
          <div className="tile tile-riscv">
            <div className="tile-media tile-diagram d-scroll" tabIndex={0} role="region" aria-label="RISC-V datapath diagram">
              <RiscvDatapath />
            </div>
            <div className="tile-text">
              <a href="https://github.com/sahiljo14/riscv-single-cycle-processor">
                <strong>
                  RISC-V processor <ArrowUpRight />
                </strong>
              </a>
              <span>A single-cycle 32-bit datapath in Verilog. Runs ADD, SUB, AND, OR, ADDI, LW and SW. An educational design, drawn here from its source.</span>
              <span className="state">Public code</span>
              <span className="d-hint state">Scroll the drawing sideways to follow the datapath.</span>
            </div>
          </div>
          <a className="tile tile-small" href="https://github.com/sahiljo14/esp8266-weather-station">
            <strong>
              ESP8266 weather station <ArrowUpRight />
            </strong>
            <span>Temperature, humidity and pressure, from the sensor up.</span>
          </a>
          <a className="tile tile-small" href="https://github.com/sahiljo14/url-shortener">
            <strong>
              URL shortener <ArrowUpRight />
            </strong>
            <span>Short links with stored click analytics. Node, Express, MongoDB.</span>
          </a>
        </div>
      </section>

      {/* 11. The automation paradox */}
      <section className="paradox wrap g12" aria-labelledby="paradox-title">
        <h2 id="paradox-title">
          If something bores me, I can be properly lazy. If I love it, I won’t
          stop.
        </h2>
        <p className="paradox-text">
          Those two meet in automation. I’ll spend a ridiculous amount of time
          automating something so I never have to do it by hand again, on the
          theory that once everything is automated, I’ll finally relax.
        </p>
        <p className="loop" aria-label="Automate it, then relax, which never happens, because I find a new idea and build it.">
          <span>Automate it.</span>
          <s>Relax.</s>
          <span>Find a new idea.</span>
          <span>Build it.</span>
          <span className="loop-again">Automate it…</span>
        </p>
      </section>

      {/* 12. Ambition, the person, and the close */}
      <section className="closing" id="contact" aria-labelledby="close-title">
        <div className="wrap closing-grid g12">
          <h2 id="close-title">
            <span>I want to be a billionaire.</span>{" "}
            <em>A trillionaire wouldn’t upset me either.</em>
          </h2>
          <figure className="closing-photo">
            <Img
              src="/images/sahil-portrait.webp"
              alt="Sahil Joshi smiling at a café table at night, wearing glasses and a dark hoodie."
              w={768}
              h={1024}
              sizes="(max-width: 760px) 12rem, 30vw"
            />
            <figcaption>Me.</figcaption>
          </figure>
          <div className="closing-copy">
            <div className="closing-two">
              <div>
                <h3>The money</h3>
                <p>
                  Not because it’s inevitable. I haven’t made it yet. I’m saying it
                  because it’s true, and because money is part of how this story
                  started: a kid who wanted a PC and kept looking for ways to pay
                  for it.
                </p>
              </div>
              <div>
                <h3>Everything else</h3>
                <p>
                  It keeps turning into something else. I thought Ethereum could
                  make me money, and the technology got more interesting than the
                  money. Over the years, I’ve kept upgrading the PC I built at
                  thirteen. I just like technology, building things and automating
                  them. Those motives get along fine.
                </p>
              </div>
            </div>
            <p className="statement">
              I’ve been figuring things out and building things since I was a
              kid. The problems are just getting bigger.
            </p>
            <div className="closing-contact">
              <a className="email-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
              <a className="text-link" href={profile.github}>
                GitHub <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Lightbox figures={ao.figures} />
    </main>
  );
}
