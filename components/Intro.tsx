import { heroFrames } from "@/lib/flimAssets";
import Reveal from "./Reveal";

const stats = [
  ["400K", "videos"],
  ["5.8K", "movies"],
  ["150K", "animations"],
  ["1.5M", "stills"],
  ["5.5K", "music videos"],
  ["2K", "TV series"],
  ["15K", "ads"],
];

export default function Intro() {
  return (
    <section id="database" className="section-space">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <Reveal>
          <div className="intro-layout">
            <div>
              <p className="text-ui-mono-xs mb-5 text-[var(--muted)]">What is Flim</p>
              <h2 className="section-title">
                A new language of visual expression.
              </h2>
              <p className="section-title text-[var(--muted)]">
                Built on the most complete platform for storytelling.
              </p>
            </div>
            <div className="intro-collage">
              {heroFrames.slice(8, 12).map((src, i) => (
                <img key={src} src={src} alt="" className={`collage-img collage-${i}`} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="stats-strip">
          {stats.map(([value, label]) => (
            <div className="stat-item" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="database-block">
            <p className="text-ui-mono-xs text-[var(--muted)]">Database</p>
            <p>
              Dive into the most complete visual library out there, curated to
              help you discover the references that shape your creative direction.
            </p>
            <h3>Find your influences</h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
