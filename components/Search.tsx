"use client";

import { useState } from "react";
import { heroFrames } from "@/lib/flimAssets";
import Reveal from "./Reveal";

const tabs = ["Search", "Beautifully.", "Create", "Purposefully."];

export default function Search() {
  const [query, setQuery] = useState("quiet loneliness water reflections");

  return (
    <section id="search" className="platform-section">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <Reveal>
          <p className="text-ui-mono-xs mb-6 text-[var(--muted)]">THE PLATFORM</p>
          <div className="platform-head">
            <h2>
              {tabs.map((tab) => (
                <span key={tab}>{tab}</span>
              ))}
            </h2>
            <p>
              For those who sketch with references, speak in moodboards, and
              shape ideas frame by frame.
            </p>
            <a href="#pricing" className="button-link">
              learn about pricing
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="search-product">
            <aside>
              <p className="text-ui-mono-xs text-[var(--muted)]">Search</p>
              <div className="product-input">
                <span>⌘/</span>
                <input value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="filter-list">
                {["Color", "Movement", "Place", "Format", "Era"].map((item) => (
                  <button key={item}>{item}</button>
                ))}
              </div>
            </aside>
            <div className="result-grid">
              {heroFrames.slice(0, 12).map((src, i) => (
                <img src={src} alt="" key={`${src}-${i}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
