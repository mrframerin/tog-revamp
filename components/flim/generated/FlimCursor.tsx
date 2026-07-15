import { createElement as h, Fragment } from "react";
import home from "@/data/home.json";

export default function FlimCursor() {
  return h("div", { "id": "custom-cursor", "className": "cursor-wrapper" }, h("div", { "className": "cursor-arrow w-embed" }, h("svg", { "viewBox": "0 0 30 34", "fill": "none", "xmlns": "http://www.w3.org/2000/svg" }, "\n", h("path", { "d": "M29.5284 18.8293C30.4317 19.4343 29.9451 20.8115 28.85 20.7493L15.3619 19.9829C14.8648 19.9547 14.4119 20.2592 14.2636 20.7213L10.2421 33.2598C9.91556 34.2778 8.41836 34.2345 8.15474 33.1993L0.0338254 1.31096C-0.205979 0.369323 0.879609 -0.360571 1.70131 0.189831L29.5284 18.8293Z", "fill": "currentColor" }, ), "\n")), h("div", { "className": "cursor-name" }, h("div", { "data-skip-build-on": "true", "className": "text-ui-sans-s" }, home.text[90])), h("div", { "className": "code w-embed w-script" }, ));
}
