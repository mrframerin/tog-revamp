"use client";

import { useEffect, useState } from "react";
import { themes, useTheme } from "./ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${scrolled ? "glass" : ""}`}>
      <div className="mx-auto flex h-[72px] max-w-[1720px] items-center justify-between px-4 md:px-8">
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <a className="nav-pill active" href="/">
            Home
          </a>
          <a className="nav-pill" href="#pricing">
            Pricing
          </a>
        </nav>

        <a href="/" className="flim-mark" aria-label="Flim home">
          Flim
        </a>

        <div className="flex items-center gap-2">
          <a href="https://app.flim.ai/login" className="nav-pill hidden md:inline-flex">
            Log-in
          </a>
          <a href="https://app.flim.ai/join" className="nav-pill nav-pill-dark">
            Sign-up
          </a>
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="theme-eye" aria-label="Toggle theme menu">
              <span />
            </button>
            {open && (
              <div className="theme-menu">
                <p className="text-ui-mono-xs mb-2 text-[var(--muted)]">Theme</p>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className="theme-row"
                  >
                    {t.label}
                    {theme === t.id && <span className="theme-dot" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="nav-pill md:hidden">Menu</button>
        </div>
      </div>
    </header>
  );
}
