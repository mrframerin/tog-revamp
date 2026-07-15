"use client";

import { useEffect } from "react";
import home from "@/data/home.json";

export default function FlimScripts() {
  useEffect(() => {
    let cancelled = false;
    const appended: HTMLScriptElement[] = [];

    const run = async () => {
      const searchTerms = [
        "Brand strategy for growth",
        "Web design for startups",
        "Creative video production studio",
        "SEO strategy",
      ];

      document
        .querySelectorAll<HTMLElement>("[data-search-term]")
        .forEach((element, index) => {
          element.dataset.searchTerm = searchTerms[index] ?? searchTerms[0];
        });
      document.querySelectorAll<HTMLInputElement>(".text-input").forEach((input) => {
        if (input.id === "input-email") {
          input.placeholder = "ENTER YOUR WORK EMAIL";
        } else {
          input.placeholder = "Explore services";
          input.setAttribute("aria-label", "Explore");
        }
      });
      document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((button) => {
        button.setAttribute("aria-label", "Toggle style menu");
      });
      document.querySelectorAll<HTMLAnchorElement>('a[href="/pricing"]').forEach((link) => {
        link.href = "#intro-section";
      });
      document.querySelectorAll<HTMLAnchorElement>("footer a").forEach((link) => {
        const label = link.textContent?.trim();
        if (label === "About") link.href = "https://togstudio.co/about";
        if (label === "Work") link.href = "https://togstudio.co/works";
      });
      for (let index = 0; index < home.scripts.length; index += 1) {
        if (cancelled) return;

        const scriptData = home.scripts[index];
        const script = document.createElement("script");
        appended.push(script);

        for (const [name, value] of Object.entries(scriptData.attrs)) {
          if (name === "src" || value == null || value === "") continue;
          script.setAttribute(name, value);
        }

        if (scriptData.src) {
          await new Promise<void>((resolve) => {
            script.onload = () => resolve();
            script.onerror = () => resolve();
            script.src = scriptData.src;
            document.body.appendChild(script);
          });
        } else {
          script.text = scriptData.code
            .replaceAll(
              "https://app.flim.ai/?ft=",
              "https://togstudio.co/?service=",
            )
            .replaceAll(
              "onLeaveBack:()=>{t.reset(),t.stop()}",
              "onLeaveBack:()=>{t.stop()}",
            );
          document.body.appendChild(script);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
      appended.forEach((script) => script.remove());
    };
  }, []);

  return null;
}
