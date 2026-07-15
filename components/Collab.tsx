import { heroFrames } from "@/lib/flimAssets";
import Reveal from "./Reveal";

const words = ["Save", "Collaborate", "& Share"];

export default function Collab() {
  return (
    <section id="collab" className="section-space pb-16">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <Reveal>
          <div className="collab-hero">
            <div>
              <h2 className="section-title">Shape Ideas Together</h2>
              <p className="mt-6 max-w-md text-lg text-[var(--muted)]">
                Accelerate your projects and collaborate, all from one place.
              </p>
            </div>
            <div>
              <h3>
                {words.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </h3>
              <p>
                Collect the images you love in boards and share them with your
                team, clients, or the world.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="board-preview">
            {heroFrames.slice(4, 16).map((src) => (
              <img src={src} alt="" key={src} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
