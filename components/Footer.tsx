"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="footer">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <div className="footer-cta">
          <p className="text-ui-mono-xs text-[var(--muted)]">Made for</p>
          <h2>
            Directors. Designers. Agencies. Art directors.
            <br />
            Built for Storytellers.
          </h2>
        </div>

        <div className="footer-grid">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="text-ui-mono-xs text-[var(--muted)]">newsletter</label>
            <div className="newsletter-row">
              <input
                type="email"
                required
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button>{sent ? "thank you." : "subscribe"}</button>
            </div>
          </form>

          <div>
            <p className="text-ui-mono-xs text-[var(--muted)]">company</p>
            <a>App.flim</a>
            <a>Pricing</a>
            <a>Blog</a>
            <a>Privacy Policy</a>
            <a>Terms & Conditions</a>
          </div>

          <div>
            <p className="text-ui-mono-xs text-[var(--muted)]">social</p>
            <a>Instagram</a>
            <a>X</a>
            <a>LinkedIn</a>
            <a>TikTok</a>
          </div>
        </div>

        <div className="footer-word">Flim</div>
        <p className="footer-copy">© Flim, all rights reserved, 2026</p>
      </div>
    </footer>
  );
}
