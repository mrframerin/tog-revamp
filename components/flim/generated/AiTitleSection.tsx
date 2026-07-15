import { createElement as h, Fragment } from "react";
import home from "@/data/home.json";

export default function AiTitleSection() {
  return h("section", { "data-lottie-stop-percent": "0.5", "data-title-section": "tools", "data-wf--title-section--variant": "left", "className": "title-section" }, h("div", { "className": "title-section-decor bg-pattern bg-brand-2" }, h("div", { "className": "title-section-circle" }, h("div", { "id": "lottie-tools", "data-lottie-path": home.assets[98], "data-lottie-id": "tools", "data-lottie-path-mobile": home.assets[99], "data-lottie-path-desktop-s": "", "data-lottie-stop-percent": "0.5", "className": "lottie" }, ))), h("div", { "className": "w-layout-blockcontainer container _w-full w-container" }, h("div", { "className": "w-layout-grid grid title-section-grid" }, h("div", { "id": "w-node-_57a6f3dc-2f65-b6a5-2eb6-cbb10f7fbc0c-fa9d2ef9", "className": "title-section-content" }, h("div", { "className": "text-ui-mono-s" }, home.text[52]), h("h2", { "className": "text-heading-h1" }, home.text[53]), h("p", { "className": "text-body-s" }, home.text[54])))));
}
