import type { Metadata } from "next";
import { createElement as h } from "react";
import home from "@/data/home.json";
import "./globals.css";
import { HeadAssets } from "@/components/flim/generated";

export const metadata: Metadata = {
  title: "Tog | Creative Branding and Web Design Agency",
  description:
    "Tog is a branding agency and web design agency delivering brand strategy, brand identity design, graphic design, video production, web development, UI UX design, SEO, and digital marketing services for ambitious growing businesses worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return h(
    "html",
    {
      lang: home.htmlAttrs.lang,
      "data-wf-domain": home.htmlAttrs["data-wf-domain"],
      "data-wf-page": home.htmlAttrs["data-wf-page"],
      "data-wf-site": home.htmlAttrs["data-wf-site"],
      suppressHydrationWarning: true,
    },
    h("head", null, h(HeadAssets)),
    h("body", { suppressHydrationWarning: true }, children),
  );
}
