import { createElement as h, Fragment } from "react";
import home from "@/data/home.json";

const title = "Tog | Creative Branding and Web Design Agency";
const description =
  "Tog is a branding agency and web design agency delivering brand strategy, brand identity design, graphic design, video production, web development, UI UX design, SEO, and digital marketing services for ambitious growing businesses worldwide.";

export default function HeadAssets() {
  return h(
    Fragment,
    null,
    h("meta", { charSet: "utf-8" }),
    h("link", {
      href: home.assets[123],
      rel: "preconnect",
      crossOrigin: "anonymous",
    }),
    h("title", null, title),
    h("meta", { content: description, name: "description" }),
    h("meta", { content: title, property: "og:title" }),
    h("meta", { content: description, property: "og:description" }),
    h("meta", { content: title, property: "twitter:title" }),
    h("meta", { content: description, property: "twitter:description" }),
    h("meta", { property: "og:type", content: "website" }),
    h("meta", { content: "summary_large_image", name: "twitter:card" }),
    h("meta", {
      content: "width=device-width, initial-scale=1",
      name: "viewport",
    }),
    h("link", {
      href: home.assets[124],
      rel: "stylesheet",
      type: "text/css",
      integrity:
        "sha384-fYjOmMvr684BK3V2OuTalsrH9cyymBH0vqdxX7UZf3Qlot0iR7pXyJjMEcnoqiBf",
      crossOrigin: "anonymous",
    }),
    h("link", { rel: "stylesheet", href: home.assets[127] }),
  );
}
