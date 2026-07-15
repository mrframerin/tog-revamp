"use client";

import { useEffect } from "react";
import home from "@/data/home.json";

export default function FlimScripts() {
  useEffect(() => {
    let cancelled = false;
    const appended: HTMLScriptElement[] = [];

    const run = async () => {
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
          script.text = scriptData.code;
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
