import Image from "next/image";
import { Expand } from "@/components/icons";
import { asset } from "@/data/profile";
import type { Figure } from "@/data/projects";

// A link to the full-size image; the page's Lightbox takes over when it can.
export function Capture({
  figure,
  className = "",
  priority = false,
  sizes,
}: {
  figure: Figure;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <a className={`capture ${className}`} href={asset(figure.src)} data-capture>
      <span className="visually-hidden">Enlarge capture: </span>
      <Image
        src={asset(figure.src)}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        priority={priority}
        sizes={sizes}
      />
      <span className="capture-hint" aria-hidden="true">
        <Expand />
      </span>
    </a>
  );
}

// A real capture or photo with its provenance caption.
export function Shot({
  figure,
  className = "spread",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 80vw",
}: {
  figure: Figure;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <Capture figure={figure} priority={priority} sizes={sizes} />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
