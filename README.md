# flim.ai recreation

Next.js 15 + Tailwind v4 + GSAP + Lenis clone of [flim.ai](https://flim.ai).

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** (CSS-first config)
- **GSAP 3** + ScrollTrigger for scroll-triggered reveals & loader mask
- **Lenis 1.3** for smooth scroll
- Image/video assets hotlinked from `cdn.prod.website-files.com`

## Setup

You need **Node.js 20+** installed first (not currently on this machine). Get it from https://nodejs.org or via winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

Then in this directory:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx        — root, mounts ThemeProvider + Loader + SmoothScroll
  page.tsx          — composes sections
  globals.css       — Tailwind v4 theme tokens, marquee keyframes, loader mask
components/
  Navbar.tsx        — sticky header with theme switcher
  Hero.tsx          — "The search engine for creative people" + tinted gallery
  BrandCarousel.tsx — infinite logo marquee (40+ brands)
  Intro.tsx         — database stats + platform mockup
  Search.tsx        — search demo + image grid
  AITools.tsx       — Image Mixer / Style Transfer / Workflow
  Collab.tsx        — Save / Collaborate / Share + outro video
  Footer.tsx        — newsletter signup + big "flim" wordmark
  SmoothScroll.tsx  — Lenis + GSAP ticker wiring
  Loader.tsx        — page-load mask reveal
  Reveal.tsx        — generic ScrollTrigger fade-in wrapper
  ThemeContext.tsx  — Samba / Noir / Psychological / Giallo / Sci-Fi
lib/
  assets.ts         — CDN URLs for galleries, brands, platform mockups, videos
```

## Theme switcher

Hover the "Theme" chip top-right. Each preset re-tints the headline accent, hero gallery overlay, AI tool numbers, and footer wordmark via the `--theme-tint` CSS variable on `<html>`.

## Notes

- Assets are hotlinked from Webflow's CDN. They may rotate or 403 at any time; swap for local copies under `public/` for production use.
- GTM proxy, Lottie animations, and Webflow-specific JS embeds from the original are intentionally omitted.
