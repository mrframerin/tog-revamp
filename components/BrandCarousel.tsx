import { brandLogos } from "@/lib/flimAssets";

export default function BrandCarousel() {
  return (
    <section className="brand-section">
      <h2 className="text-ui-mono-xs text-center text-[var(--muted)]">
        Trusted by the brands shaping culture
      </h2>
      <div className="marquee-mask mt-8 overflow-hidden">
        <div className="marquee-track gap-12 md:gap-20">
          {[...brandLogos, ...brandLogos, ...brandLogos].map(([name, src], i) => (
            <img
              key={`${name}-${i}`}
              src={src}
              alt={`${name} logo`}
              className="h-8 w-auto flex-shrink-0 object-contain opacity-80 grayscale transition hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
