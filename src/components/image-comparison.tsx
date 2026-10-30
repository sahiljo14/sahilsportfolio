"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { asset } from "@/data/profile";

export function ImageComparison() {
  const [reveal, setReveal] = useState(50);
  const id = useId();
  return (
    <figure className="comparison">
      <div className="comparison-images">
        <Image
          src={asset("/images/kairyo-before.webp")}
          alt="Original low-resolution sample illustration from Kairyo’s public demonstration."
          width={1536}
          height={1024}
          sizes="(max-width: 700px) 100vw, 700px"
        />
        <Image
          className="comparison-after"
          src={asset("/images/kairyo-after.webp")}
          alt="The same illustration after Kairyo’s super-resolution workflow."
          width={1536}
          height={1024}
          sizes="(max-width: 700px) 100vw, 700px"
          style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
        />
        <span
          className="comparison-line"
          style={{ left: `${reveal}%` }}
          aria-hidden="true"
        />
        <span className="comparison-label label-after">Upscaled</span>
        <span className="comparison-label label-before">Original</span>
      </div>
      <div className="comparison-control">
        <label htmlFor={id}>Reveal the result</label>
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-valuetext={`${reveal}% of the upscaled image revealed`}
        />
        <output htmlFor={id}>{reveal}%</output>
      </div>
      <figcaption>
        Real output from Kairyo’s public comparison. The source illustration was
        AI-generated for the project. Use the slider or arrow keys to compare.
      </figcaption>
    </figure>
  );
}
