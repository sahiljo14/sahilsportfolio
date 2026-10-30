import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/icons";
import { BoardDrawing } from "@/components/board-drawing";
import { asset, profile, site, socialImage } from "@/data/profile";

export const metadata: Metadata = {
  title: "The full story",
  description:
    "The long version: from wanting a gaming PC to building Agent Orchestrator and co-founding Kramiva Technologies.",
  alternates: { canonical: `${site.url}/story/` },
  openGraph: { images: [socialImage], url: `${site.url}/story/` },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
};

const parts = [
  { id: "p1", title: "The machine I didn’t have" },
  { id: "p2", title: "Rabbit holes" },
  { id: "p3", title: "From experiments to products" },
  { id: "p4", title: "What drives me now" },
];

function PartHead({ n }: { n: number }) {
  return (
    <header className="read-opener">
      <div className="wrap g12">
        <p aria-hidden="true">{n + 1}</p>
        <h2 id={parts[n].id}>{parts[n].title}</h2>
      </div>
    </header>
  );
}

function Chapter({
  id,
  age,
  title,
  children,
}: {
  id: string;
  age: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="read-chapter wrap g12" id={id} aria-labelledby={`${id}-t`}>
      <p className="read-age" aria-hidden="true">
        {age}
      </p>
      <div className="read-body">
        <h3 id={`${id}-t`}>
          <span className="visually-hidden">{age}: </span>
          {title}
        </h3>
        {children}
      </div>
    </section>
  );
}

export default function Story() {
  return (
    <main id="main-content" tabIndex={-1} className="read">
      <div className="read-progress" aria-hidden="true" />
      <header className="read-head wrap g12">
        <h1>How one want turned into everything else.</h1>
        <figure className="read-portrait">
          <Image
            src={asset("/images/sahil-portrait.webp")}
            alt="Sahil Joshi smiling at a café table at night, wearing glasses and a dark hoodie."
            width={768}
            height={1024}
            priority
            sizes="(max-width: 760px) 60vw, 26vw"
          />
        </figure>
        <div className="read-intro">
          <p className="read-dek">
            The long version, about a ten-minute read. Ages are approximate;
            everything else is as it happened.
          </p>
          <nav aria-label="Parts of the story">
            <ol className="read-toc">
              {parts.map((part, i) => (
                <li key={part.id}>
                  <a href={`#${part.id}`}>
                    <span>{i + 1}</span> {part.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <section className="read-part" aria-labelledby="p1">
        <PartHead n={0} />
        <Chapter id="before" age="4–5" title="Before the PC">
          <p>
            I started using computers when I was four or five. Mostly for games
            and the internet, but also for the things kids usually ignore:
            settings, installers, what happens when you change this.
          </p>
          <p>
            One of my earliest memories of a computer is educational. My mother
            installed software to help me learn my multiplication tables faster.
            So from the start, a computer was both where I played and where I
            learned. That’s where the comfort came from.
          </p>
        </Chapter>
        <Chapter id="the-pc" age="~11" title="The PC I didn’t have">
          <p>
            I didn’t have a gaming PC, or a PlayStation, to play the games I
            wanted. Around seventh grade, I started watching PC-building videos.
          </p>
          <p>
            At first I just wanted a machine that could run games. Then it turned
            into something else. I researched CPUs and GPUs, read benchmarks,
            compared motherboards and coolers, worked out which parts were
            compatible, and planned builds I had no money for. I researched
            hardware even when I wasn’t planning to buy anything.
          </p>
          <p>
            Somewhere in there, it stopped being about the games. I’d fallen for
            the hardware itself.
          </p>
          <blockquote>
            A lot of what I did over the next few years can be traced back to
            wanting that PC, and to figuring out how to afford it.
          </blockquote>
        </Chapter>
        <Chapter id="paying-for-it" age="11–12" title="Paying for it">
          <p>A PC costs money, and I was eleven. So I started trying things.</p>
          <p>
            I made technology videos for YouTube. Around twelve I tried affiliate
            marketing, promoting a VPN service and some health-related products.
          </p>
          <p>
            The point isn’t what those experiments earned. It’s that at twelve I
            was already testing different ways to get something I wanted, instead
            of waiting for it.
          </p>
        </Chapter>
        <Chapter id="building-it" age="~13" title="Building it">
          <p>
            I put together my first PC at around thirteen, after years of videos,
            research and imaginary builds.
          </p>
          <p>
            It wasn’t a one-time project. Over the years I’ve swapped the CPU, the
            GPU, the motherboard and the RAM, and added an AIO cooler and more SSD
            storage. Each upgrade was another excuse to understand the machine a
            little better. I started out wanting something that could play games.
            I ended up wanting to know how it works.
          </p>
        </Chapter>
        <div className="read-wide wrap">
          <BoardDrawing />
        </div>
      </section>

      <section className="read-part" aria-labelledby="p2">
        <PartHead n={1} />
        <Chapter id="ethereum" age="~13" title="Ethereum, for the money at first">
          <p>
            Around the same time I found Ethereum. I’ll be straightforward about
            why: I thought it could make me money.
          </p>
          <p>
            Then the technology became more interesting than the money. I traded,
            tried mining, researched different coins, read whitepapers, explored
            decentralized finance, and at one point tried to create my own
            cryptocurrency.
          </p>
          <p>
            I still follow the space. These days most of my attention goes to AI,
            automation and developer tools.
          </p>
        </Chapter>
        <Chapter id="python" age="13–14" title="Python, and a Discord bot">
          <p>
            Around eighth or ninth grade (I honestly don’t remember which) I
            started teaching myself Python from YouTube, tutorials and a lot of
            trial and error. The first programs were the usual exercises.
          </p>
          <p>
            The first thing I made because I wanted it was a Discord bot. It
            replied to certain keywords and sent GIFs into a server. Not
            complicated, and definitely not a startup. But I wanted it to exist,
            so I taught myself how to make it. That’s still roughly how I work.
          </p>
        </Chapter>
        <Chapter id="the-rest" age="Since" title="Everything else I fell into">
          <p>
            I don’t have one fixed obsession. When something catches my attention
            I tend to go all the way down.
          </p>
          <p>
            Linux was a big one. I’ve tried Arch, Ubuntu, Manjaro, EndeavourOS and
            Pop!_OS, and run CasaOS and ZimaOS to host my own things. I like
            running my own servers and managing my own infrastructure. Same with
            tools like FFmpeg: I want to know how they work, then find a way to
            use them in a project or an automation.
          </p>
          <p>
            There was electronics too: microcontrollers, an ESP8266 weather
            station, EnviroSense, a RISC-V processor in Verilog. Around nineteen I
            was cutting Valorant montages for YouTube. It’s curiosity, not a list
            of things I’ve mastered.
          </p>
        </Chapter>
        <Chapter id="the-handheld" age="18" title="Then I built the machine myself">
          <p>
            In my second year of engineering, I built a handheld NES console
            around an ESP32. I liked retro games, I wanted to experiment with
            electronics, and building my own console sounded cool. That was the
            whole reason.
          </p>
          <p>
            It worked. I played Contra and Super Mario on it. The hard parts were
            the soldering and getting the firmware to behave.
          </p>
          <blockquote>
            As a kid, I wanted a machine to play games on. Years later, I was
            soldering one together.
          </blockquote>
        </Chapter>
        <figure className="read-figure">
          <Image
            src={asset("/images/console-wide.webp")}
            alt="Close-up of the handheld console: the ESP32 development board soldered onto green perfboard, with hand-labelled SE, ST, M, B and arrow buttons below it."
            width={2400}
            height={958}
            sizes="100vw"
          />
          <figcaption>
            Real photo. The ESP32, the hand-labelled buttons, and a lot of
            solder.
          </figcaption>
        </figure>
      </section>

      <section className="read-part" aria-labelledby="p3">
        <PartHead n={2} />
        <Chapter id="not-yet" age="For years" title="Wanting to build, and not quite believing I could">
          <p>
            I’ve always wanted to build my own products. For a long time I
            didn’t. I wasn’t confident enough in my engineering, and I couldn’t
            find an idea that felt worth committing to. I had plenty of
            experiments. A complete product still felt like something other
            people made.
          </p>
        </Chapter>
        <Chapter id="internship" age="2026" title="An internship changed that">
          <p>
            I’m in the fourth month of an internship, working on an end-to-end
            application. The details are confidential. What it did for me isn’t:
            taking real software from idea to working implementation showed me I
            could build far more ambitious things than I’d believed.
          </p>
        </Chapter>
        <Chapter id="agency" age="2026" title="So, an agency?">
          <p>
            With that confidence I started seriously thinking about a software
            agency: building software for clients, owning the whole process,
            making something independently. Which raised a practical question.
            How could a small team do that much work? That question led me to AI
            coding agents.
          </p>
        </Chapter>
        <Chapter id="orchestrator" age="Jul 2026" title="Agent Orchestrator">
          <p>
            I wanted several coding agents working on one project together, with
            me still in control of what they did. I couldn’t find a tool that
            worked the way I had in mind, so I started building one for my own
            agency.
          </p>
          <p>
            The more I built, the clearer it got that anyone running more than one
            coding agent has this problem. That’s when it stopped being an
            internal tool and became a product I want other developers to use.
          </p>
          <a className="text-link" href={asset("/work/agent-orchestrator/")}>
            The case study
          </a>
        </Chapter>
        <Chapter id="lead-finder" age="Sep 2026" title="Lead Finder">
          <p>
            An agency also needs clients, and finding leads by hand is slow:
            search for businesses, read their websites, judge the fit, write each
            email. Same pattern as before. A goal, a repetitive process, an urge
            to automate it.
          </p>
          <a className="text-link" href={asset("/work/lead-finder/")}>
            How it’s built
          </a>
        </Chapter>
        <Chapter id="kramiva" age="Now" title="Kramiva Technologies">
          <p>
            I’m one of three co-founders of Kramiva Technologies Pvt Ltd, a
            founder-led software company that builds its own products and software
            for clients. It’s early, and I’d rather say that plainly than dress it
            up.
          </p>
        </Chapter>
      </section>

      <section className="read-part" aria-labelledby="p4">
        <PartHead n={3} />
        <Chapter id="obsessions" age="Now" title="What I can’t stop thinking about">
          <p>
            AI agents. Automation. Developer tools. Building startups and
            products, and making money from them. Finding some new piece of
            technology and taking it apart to see what it does.
          </p>
        </Chapter>
        <Chapter id="automation" age="Always" title="The automation paradox">
          <p>
            Something true about me: if a thing bores me, I can be properly lazy
            about it. If I love it, I’ll put in an absurd amount of effort.
          </p>
          <p>
            Those two meet in automation. I will happily spend a ridiculous amount
            of time automating something so I never have to do it by hand again.
            The plan is always that once everything is automated, I’ll finally get
            to relax.
          </p>
          <p>
            It hasn’t happened. By the time one thing is automated I’ve found
            another project, another technology, another idea. So I keep building.
          </p>
        </Chapter>
        <Chapter id="money" age="Now" title="About the money">
          <p>
            I’m very ambitious about money. I want to be a billionaire. A
            trillionaire wouldn’t upset me either.
          </p>
          <p>
            I’m not saying that because it’s inevitable, and I haven’t made it
            yet. I’m saying it because it’s true, and because money is part of how
            this whole story started: a kid who wanted a PC and kept looking for
            ways to pay for it. Building products that make real money is still a
            big part of what excites me.
          </p>
          <p>
            I also like technology, like building things and like automating
            them. Those motives get along fine.
          </p>
        </Chapter>
      </section>

      <footer className="read-end wrap">
        <p>
          That’s the story so far. The next chapter isn’t written yet.
        </p>
        <a className="text-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="text-link" href={asset("/")}>
          <Arrow className="flip" /> Back to the front page
        </a>
      </footer>
    </main>
  );
}
