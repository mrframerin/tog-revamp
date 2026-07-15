"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const mask = ref.current.querySelector(".loader-mask") as HTMLElement;
    gsap
      .timeline()
      .fromTo(
        mask,
        { "--maskY": "0%" },
        { "--maskY": "100%", duration: 0.8, ease: "power2.inOut" }
      )
      .set(ref.current, { visibility: "hidden" });
  }, []);

  return (
    <div ref={ref} className="loader" aria-hidden>
      <div className="loader-mask bg-pattern" />
    </div>
  );
}
