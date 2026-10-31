import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow, ArrowUpRight } from "@/components/icons";
import { EnviroDiagram } from "@/components/enviro-diagram";
import { ImageComparison } from "@/components/image-comparison";
import { LeadFlow } from "@/components/lead-flow";
import { Lightbox } from "@/components/lightbox";
import { Pipeline } from "@/components/pipeline";
import { Shot } from "@/components/shot";
import { VideoDemo } from "@/components/video-demo";
import { asset, site, socialImage } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const url = `${site.url}/work/${slug}/`;
  const title = `${project.name} — Sahil Joshi`;
  return {
    title: project.name,
    description: project.dek,
    alternates: { canonical: url },
    openGraph: { type: "article", images: [socialImage], title, description: project.dek, url },
    twitter: { card: "summary_large_image", images: [socialImage.url], title, description: project.dek },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const [lead, ...rest] = project.figures;
  const [firstOrigin, ...moreOrigin] = project.origin;
  return (
    <main id="main-content" tabIndex={-1} className="case">
      <header className="case-head wrap">
        <a className="back-link" href={asset("/")}>
          <Arrow className="flip" /> Sahil Joshi
        </a>
        <h1>{project.name}</h1>
        <p className="case-dek">{project.dek}</p>
        <dl className="case-facts">
          <div>
            <dt>My part</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>{project.state}</dd>
          </div>
        </dl>
        {project.links.length ? (
          <p className="case-links">
            {project.links.map((link) => (
              <a key={link.url} className="text-link" href={link.url}>
                {link.label} <ArrowUpRight />
              </a>
            ))}
          </p>
        ) : null}
      </header>

      {lead ? (
        <div className="case-stage">
          <Shot figure={lead} priority className="stage-shot wrap" sizes="(max-width: 760px) 100vw, 90vw" />
        </div>
      ) : null}
      {slug === "envirosense" ? (
        <figure className="case-visual wrap">
          <div className="case-visual-panel">
            <EnviroDiagram />
          </div>
          <figcaption>Illustration of the data path, drawn from the repository.</figcaption>
        </figure>
      ) : null}
      {project.video ? (
        <section className="case-stage" aria-labelledby="demo">
          <div className="demo wrap">
            <VideoDemo video={project.video} />
            <div className="demo-copy">
              <h2 id="demo">The demo</h2>
              <ol className="demo-moments">
                {project.video.moments.map((moment) => (
                  <li key={moment.at}>
                    <span className="demo-at">{moment.at}</span>
                    <div>
                      <h3>{moment.title}</h3>
                      <p>{moment.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="demo-note">{project.video.note}</p>
              <a className="text-link" href={project.video.url}>
                Watch on YouTube <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <div className="case-body wrap">
        <section className="case-sec" aria-labelledby="why">
          <h2 id="why">Why I built it</h2>
          <div>
            <p className="case-lede">{firstOrigin}</p>
            {moreOrigin.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="case-sec" aria-labelledby="how">
          <h2 id="how">How it works</h2>
          {slug === "lead-finder" ? (
            <LeadFlow steps={project.pipeline} />
          ) : (
            <Pipeline steps={project.pipeline} label={`How ${project.name} works`} />
          )}
        </section>

        <section className="case-sec" aria-labelledby="decisions">
          <h2 id="decisions">Decisions that mattered</h2>
          <ol className="decisions">
            {project.decisions.map((d) => (
              <li key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {rest.length ? (
          <div className={`case-shots case-shots-${rest.length}`}>
            {rest.map((figure) => (
              <Shot
                key={figure.src}
                figure={figure}
                className="case-shot"
                sizes="(max-width: 760px) 100vw, 60vw"
              />
            ))}
          </div>
        ) : null}
        {slug === "kairyo" ? <ImageComparison /> : null}

        <section className="case-sec" aria-labelledby="status">
          <h2 id="status">Where it stands</h2>
          <div className="status-grid">
            {project.evidence ? (
              <div>
                <h3>What’s tested</h3>
                <p>{project.evidence}</p>
              </div>
            ) : null}
            <div>
              <h3>What isn’t finished</h3>
              <p>{project.unfinished}</p>
            </div>
          </div>
        </section>

        <section className="case-sec" aria-labelledby="learned">
          <h2 id="learned">What I learned</h2>
          <p className="case-lesson">{project.learned}</p>
        </section>
      </div>

      {project.figures.length ? <Lightbox figures={project.figures} /> : null}
      <a className="next-case wrap" href={asset(`/work/${next.slug}/`)}>
        <span className="next-label">Next project</span>
        <strong>
          {next.name}
        </strong>
        <span>{next.dek}</span>
      </a>
    </main>
  );
}
