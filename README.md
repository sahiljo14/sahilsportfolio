# Sahil Joshi

A first-person, story-first personal site: how wanting a gaming PC led through hardware, crypto, Python, Linux and electronics to building Agent Orchestrator and co-founding Kramiva Technologies. Next.js, React, TypeScript and plain CSS, exported as static HTML. Self-hosted Schibsted Grotesk (display) and Source Serif 4 (reading), both SIL OFL, licenses in `public/`.

The visual system is documented in `DESIGN.md`. Private working notes (fact sheet, product context, design-review files) are kept outside this repository.

## Local preview

Use Node.js 22.18 or newer.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://127.0.0.1:3000). For the production export:

```sh
npm run build
npm run preview
```

The preview serves `out/` on localhost only. Change the port with `PORT=3001 npm run preview`.

## Update the content

- `src/app/page.tsx`: the home page, one composed section at a time. `src/app/story/page.tsx`: the long version. Keep ages approximate and never add an anecdote Sahil hasn't confirmed.
- `src/data/projects.ts`: case studies (`/work/[slug]/`) and the "Other things I've built" list. `state` uses a strict vocabulary; every figure caption must start with "Real capture", "Real photo" or "Illustration" (enforced by `tests/content.test.mjs`).
- `src/data/profile.ts`: identity, contact and canonical URL.
- `src/components/`: the diagrams, the board illustration and the capture lightbox.
- `public/images/`: optimized real photos and captures, metadata stripped. The social preview is `social-preview.png`.

Content rules (tested): no private repository links, no internship client details, no stale test counts. Names that must never appear are checked against a local, gitignored `.private-denylist`.

## Validation

```sh
npm run build
npm test
npm run typecheck
npm run lint
npx playwright install chromium webkit
npm run preview
# In a second terminal:
npm run test:browser
```

Content tests validate routes, required evidence, asset existence, ownership labels, and absence of placeholders/private repository URLs. Browser checks cover all seven pages (home, the story and five case studies) at 320, 375, 390, 768, 1024, 1280, 1440, and 1920 pixels in both themes; axe WCAG A/AA checks; keyboard navigation; the capture lightbox in Chromium and WebKit, including touch profiles; clipboard success/failure; comparison-slider keyboard behavior; reduced motion; internal links and anchors; 404 behavior; WebKit mobile smoke checks; and useful content with JavaScript disabled. Generated screenshots and JSON evidence go in ignored `artifacts/`; current captures are in `artifacts/upgrade-screenshots/`. The browser suite also verifies explicit theme choices, reload/navigation persistence, OS changes, cross-tab synchronization, and blocked/invalid storage.

For a different running preview, set `PREVIEW_URL=http://127.0.0.1:3001 npm run test:browser`. The default test expects a root-path preview; use a normal root build for the full suite.

## Deployment preparation — no deployment performed

Any static host can serve `out/`. There is no contact server to configure; email actions use the user-approved `mailto:` address. Build once for the intended path and canonical URL.

For the existing GitHub Pages project path:

```sh
NEXT_PUBLIC_BASE_PATH=/sahilsportfolio \
NEXT_PUBLIC_SITE_URL=https://sahiljo14.github.io/sahilsportfolio \
npm run build
```

Deploy the contents of `out/` only after reviewing and approving the result. GitHub Pages must use an artifact-based Pages workflow or a `.nojekyll` file so `_next` assets are served. For a root domain or Vercel static hosting, leave `NEXT_PUBLIC_BASE_PATH` unset and set `NEXT_PUBLIC_SITE_URL` to the intended full HTTPS URL. The base path must start with `/` and have no trailing slash.

To inspect a subpath build locally:

```sh
NEXT_PUBLIC_BASE_PATH=/sahilsportfolio npm run preview
```

The preview opens under `/sahilsportfolio/`. Build-time environment changes require rebuilding. `npm run build` without these variables returns to the normal root-path preview.

## Theme system

The default follows the operating system. The sun, monitor, and moon controls select Light, System, and Dark. Explicit choices persist under `sahil-theme-v1`; selecting System resumes live OS tracking. Storage restrictions do not break the current-page choice.

Palette and component tokens live in `src/app/globals.css`. `src/lib/theme.ts` owns preference validation and the pre-paint bootstrap; `src/components/theme-switch.tsx` is the accessible control. The document root is the state owner. Keep the bootstrap in the head so the saved palette applies before paint, and retain `suppressHydrationWarning` only on that intentionally modified root.

The local preview serves gzip-compressed text when the browser accepts it, while images and already-compressed font files keep their original encoding. The deployment host controls its own production compression and cache policy.
