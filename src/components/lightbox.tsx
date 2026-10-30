"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/profile";
import type { Figure } from "@/data/projects";

// Enlarges the page's captures. Each capture is a plain link to its image, so
// without JavaScript it still opens at full size; this only takes over the click.
// <dialog> supplies the focus trap, Escape and the inert page behind it.
export function Lightbox({ figures }: { figures: Figure[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [canZoom, setCanZoom] = useState(false);
  const figure = index === null ? null : figures[index];
  const several = figures.length > 1;

  useEffect(() => {
    const open = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[data-capture]");
      const at = link ? figures.findIndex((f) => link.href.endsWith(f.src)) : -1;
      if (at < 0) return;
      e.preventDefault();
      opener.current = link;
      setIndex(at);
      dialog.current?.showModal();
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, [figures]);

  const go = (step: number) => {
    setZoomed(false);
    setCanZoom(false);
    setIndex((i) => ((i ?? 0) + step + figures.length) % figures.length);
  };
  // Zooms to the point that was picked, as fractions of the image.
  const zoomTo = (x: number, y: number) => {
    setZoomed(true);
    requestAnimationFrame(() => {
      const v = view.current;
      v?.scrollTo(x * v.scrollWidth - v.clientWidth / 2, y * v.scrollHeight - v.clientHeight / 2);
    });
  };

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Enlarged capture"
      data-zoomed={zoomed || undefined}
      onClose={() => {
        setIndex(null);
        setZoomed(false);
        setCanZoom(false);
        opener.current?.focus();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target === view.current) dialog.current?.close();
      }}
      onKeyDown={(e) => {
        // Zoomed in, the arrow keys scroll the image instead.
        if (zoomed || !several) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="lightbox-bar">
        <p role="status">{several && index !== null ? `${index + 1} of ${figures.length}` : ""}</p>
        {canZoom ? (
          <button type="button" onClick={() => (zoomed ? setZoomed(false) : zoomTo(0.5, 0.5))}>
            {zoomed ? "Fit to screen" : "Zoom in"}
          </button>
        ) : null}
        <button type="button" autoFocus onClick={() => dialog.current?.close()}>
          Close
        </button>
      </div>
      <div ref={view} className="lightbox-view" tabIndex={0} role="group" aria-label="Capture">
        {figure ? (
          <Image
            key={figure.src}
            src={asset(figure.src)}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            sizes="100vw"
            style={{ "--w": `${figure.width}px` } as React.CSSProperties}
            onLoad={(e) =>
              setCanZoom(e.currentTarget.naturalWidth > e.currentTarget.clientWidth)
            }
            onClick={(e) => {
              if (!canZoom) return;
              if (zoomed) return setZoomed(false);
              const box = e.currentTarget.getBoundingClientRect();
              zoomTo((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height);
            }}
          />
        ) : null}
      </div>
      <div className="lightbox-foot">
        {several ? (
          <button type="button" onClick={() => go(-1)}>
            Previous
          </button>
        ) : null}
        <p>{figure?.caption}</p>
        {several ? (
          <button type="button" onClick={() => go(1)}>
            Next
          </button>
        ) : null}
      </div>
    </dialog>
  );
}
