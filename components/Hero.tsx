"use client";

import { heroFrames } from "@/lib/flimAssets";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="mx-auto max-w-[1720px] px-4 pt-28 md:px-8 md:pt-36">
        <Reveal>
          <div className="hero-grid">
            <p className="text-ui-mono-xs hero-kicker">The Creative Sidekick</p>
            <h1 className="hero-title">Flim</h1>
            <div className="hero-copy">
              <p className="text-ui-mono-xs text-[var(--muted)]">Made for</p>
              <p>Directors. Designers. Agencies. Art directors.</p>
              <p>Built for Storytellers.</p>
              <a href="https://app.flim.ai/join" className="button-big">
                Sign up now
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div id="cursor-trigger" className="hero-belt-wrap">
        <div className="search-chip search-chip-left">
          <span>SEARCH</span>
        </div>
        <div className="search-chip search-chip-right">
          <span>SEARCH</span>
          <span className="opacity-45">⌘/</span>
        </div>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track marquee-track-fast gap-2 md:gap-3">
            {[...heroFrames, ...heroFrames].map((src, i) => (
              <figure className="hero-frame" key={`${src}-${i}`}>
                <img src={src} alt="" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
