---
name: Sahil Joshi
description: A personal editorial feature in two voices, set on cool paper with one perfboard-green drench.
colors:
  paper: "#eff1f1"
  paper-raised: "#e2e6e5"
  ink: "#131816"
  ink-soft: "#2f3834"
  ink-faint: "#535d58"
  rule: "#c9cfcc"
  solder-green: "#0b6b4d"
  select: "#bfe3d2"
  board: "#0d4a36"
  board-ink: "#eef5f0"
  board-soft: "#c3dacd"
  board-rule: "#2d6c55"
  screen: "#0b100e"
  screen-glow: "#1b4636"
  night-paper: "#0d1110"
  night-paper-raised: "#161c1a"
  night-ink: "#edf0eb"
  night-ink-soft: "#c8d0ca"
  night-ink-faint: "#9aa49e"
  night-rule: "#2b332f"
  night-green: "#7fd1a8"
  night-green-ink: "#93dbb7"
  night-board: "#0f4433"
  night-screen: "#141c19"
  night-screen-glow: "#1f5541"
typography:
  voice:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.25rem + 4.7vw, 5.75rem)"
    fontWeight: 380
    lineHeight: 1.06
    letterSpacing: "-0.028em"
  name:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontWeight: 860
    lineHeight: 1
    letterSpacing: "-0.04em"
  age:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(3.25rem, 1.6rem + 5vw, 6.5rem)"
    fontWeight: 340
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.125rem, 1.03rem + 0.28vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
rounded:
  capture: "10px"
  panel: "clamp(16px, 2vw, 28px)"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  gap: "clamp(1rem, 2.5vw, 2.5rem)"
  section: "clamp(4.5rem, 2.75rem + 5.5vw, 8.5rem)"
---

# Design System: Sahil Joshi

## Overview

**Creative North Star: "One want, two voices."** An edited feature about one person, not a template repeated down a page. Each home-page section is composed on its own, and `/story/` is a long-form magazine piece.

Two voices do the structural work. **Source Serif 4 at display size is Sahil speaking**: the story's headings, statements and ages. **Schibsted Grotesk names the things he built** (Diffrail, Lead Finder, Kramiva) and carries labels. The hero is the rule stated once: the want in grotesk, the consequence in serif.

## Colors

One accent family, solder-mask green, on cool grey paper. The paper is never cream.

Four fields, each with a job:
- **Paper**: the default.
- **Raised paper**: story part openers, and the fields behind diagrams. On the home page paper runs unbroken, so the page reads as one piece rather than a stack of bands.
- **Board green**: the handheld is the one drench per page. The only other use is the Approve step in the Lead Finder flow, a small mark for the one step a person owns.
- **Screen**: the lit Diffrail panel, and the closing section, which runs into the home page footer.

**Dark mode raises fields instead of sinking them.** `--screen` is lighter than `--paper` at night, so sections keep their edges. Any new dark field must obey this.

## Layout

`.g12` is the only spread grid. Below 760px it becomes `display: block`, which retires every column placement at once, so do not write per-section mobile column resets. `--edge` aligns full-bleed sections with `.wrap` content.

- Hero: copy and an edge-to-edge console photo, filling the first viewport. Headline size is `min(15.6cqi, 13.4svh)`, so it fits its column and leaves the actions on screen. Portrait tablets and phones stack.
- Spacing: each paper section owns the `--space` above it, so two sections never stack their padding. The handheld photo rises out of its band to tie the green to the paper above.
- Diffrail: a rounded panel inset from the viewport, holding a staggered collage of the 2 November captures, arranged so nothing covers the agents at work. Phones lead with the capture that reads at that size.
- Lead Finder: a track that runs to a person and stops. Research, approval and sending are separate zones, each with its safeguard beneath. It uses only what the case study already says.
- Closing: the headline repeats the hero's two voices, so the page ends the way it began.
- Other builds: `subgrid` tiles, so media and text rows align across a row.
- Case studies: section name in the margin, content in the wide column.
- Story: sticky age in the margin, measure in the middle, pull quotes breaking out to the right, full-bleed photo.

## Components

- **Age**: the chronology of the site, set large in serif with a small label ("Around", "Age"). Never a footnote. Ages read as approximate.
- **Pipeline**: numbered because it is a real sequence. Nothing else gets numbers.
- **Capture**: a plain link to the full-size image, so it works without JavaScript. The page's Lightbox takes over the click, on a native `<dialog>`. Anything that can be enlarged has to be checked at full size for private details first.
- **Figures**: every image is real and captioned with what it is. Illustrations say so. Product captures name their build and that agents were scripted.
- **Buttons**: pills, no trailing arrows. External links keep the up-right arrow because it carries information.

## Motion

One orchestrated hero entrance, then only scroll-linked motion that means something: the Diffrail windows settle, "Relax." gets crossed out, the story keeps a reading-progress line. All of it sits behind `prefers-reduced-motion: no-preference` and `@supports (animation-timeline: view())`.

## Do's and Don'ts

- **Do** size display type with `cqi` and `svh` when it must fit a container or a fold.
- **Do** crop around private labels. **Never** paint over, edit or fabricate a capture.
- **Do** use only captures whose source and build are on record, and that were reviewed at full size.
- **Don't** add a second accent, a cream paper, or a second board-green field.
- **Don't** use uppercase tracked labels, monospace labels or middle-dot metadata strings.
- **Don't** give body text a line-height under 1.5, or display grotesk under 1.0: descenders collide.
