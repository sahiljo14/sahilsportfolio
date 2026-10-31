"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Play } from "@/components/icons";
import { asset } from "@/data/profile";
import type { Video } from "@/data/projects";

// A link to the video until it's pressed, so nothing loads from YouTube before
// then and the link still works without JavaScript.
export function VideoDemo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  const play = (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setPlaying(true);
  };

  return (
    <div className="demo-frame">
      {playing ? (
        <iframe
          ref={player}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <a href={video.url} onClick={play} aria-label={`Play video: ${video.title}`}>
          <Image
            src={asset(video.poster)}
            alt=""
            width={1080}
            height={1920}
            sizes="(max-width: 760px) 80vw, 21rem"
          />
          <span className="demo-play">
            <Play />
          </span>
        </a>
      )}
    </div>
  );
}
