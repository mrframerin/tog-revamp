import type { Metadata } from "next";
import { createElement as h } from "react";
import home from "@/data/home.json";
import "./globals.css";
import { HeadAssets } from "@/components/flim/generated";

export const metadata: Metadata = {
  title: "Flim | The search engine for creative people",
  description:
    "Movie & Video Database - Flim is the leading image research website, delivering handpicked HD stills and Video Cuts. AI search engine helps you to quickly find the ideal visual for your creative needs.",
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
