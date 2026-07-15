import { heroFrames } from "@/lib/flimAssets";
import Reveal from "./Reveal";

export default function AITools() {
  return (
    <section id="ai" className="section-space">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <Reveal>
          <div className="split-heading">
            <div>
              <p className="text-ui-mono-xs mb-5 text-[var(--muted)]">AI Tools</p>
              <h2 className="section-title">Tools to Unlock Creativity.</h2>
              <p className="mt-6 max-w-sm text-lg text-[var(--muted)]">
                Trained for style, tuned for creators.
              </p>
            </div>
            <div className="feature-stack">
              <img src={heroFrames[20]} alt="" />
              <img src={heroFrames[21]} alt="" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ai-panel">
            <div>
              <h3>
                Generate
                <br />& Edit
              </h3>
              <p>
                An AI built for creators, helping you to transform ideas into
                artistic visions.
              </p>
              <a href="https://app.flim.ai" className="button-big">
                Create a magic board
              </a>
            </div>
            <div className="magic-board">
              {heroFrames.slice(12, 18).map((src) => (
                <img key={src} src={src} alt="" />
              ))}
              <span>Combine ideas</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
