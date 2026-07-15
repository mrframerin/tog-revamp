import fs from "node:fs";
import path from "node:path";
import * as parse5 from "parse5";

const root = process.cwd();
const sourcePath = path.join(root, "public", "flim.html");
const dataPath = path.join(root, "data", "home.json");
const outDir = path.join(root, "components", "flim", "generated");

const source = fs.existsSync(sourcePath)
  ? fs.readFileSync(sourcePath, "utf8")
  : await fetch("https://flim.ai").then((response) => response.text());
const existing = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const attrObject = (attrs = []) =>
  Object.fromEntries(attrs.map((attr) => [attr.name, attr.value]));

const htmlAttrs = attrObject(
  source.match(/<html\s+([^>]*)>/i)?.[1]
    ? [...source.match(/<html\s+([^>]*)>/i)[1].matchAll(/([:\w-]+)="([^"]*)"/g)].map(
        ([, name, value]) => ({ name, value }),
      )
    : [],
);

const bodyAttrs = attrObject(
  source.match(/<body\s*([^>]*)>/i)?.[1]
    ? [...source.match(/<body\s*([^>]*)>/i)[1].matchAll(/([:\w-]+)="([^"]*)"/g)].map(
        ([, name, value]) => ({ name, value }),
      )
    : [],
);

const headHtml = source.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
let bodyHtml = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";

const scripts = [];
let cleanHead = headHtml.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, rawAttrs, code) => {
  const attrs = Object.fromEntries([...rawAttrs.matchAll(/([:\w-]+)=["']?([^"'\s>]+)/g)].map((m) => [m[1], m[2]]));
  scripts.push({ location: "head", attrs, src: attrs.src || "", code: attrs.src ? "" : code.trim() });
  return "";
});

bodyHtml = bodyHtml.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, rawAttrs, code) => {
  const attrs = Object.fromEntries([...rawAttrs.matchAll(/([:\w-]+)=["']?([^"'\s>]+)/g)].map((m) => [m[1], m[2]]));
  scripts.push({ location: "body", attrs, src: attrs.src || "", code: attrs.src ? "" : code.trim() });
  return "";
});

const markers = [
  ["loader", "FlimLoader", '<div id="loader"'],
  ["header", "FlimHeader", '<header class="header"'],
  ["hero", "HeroSection", '<section class="hero-section"'],
  ["brands", "BrandsSection", '<section class="section brands-section"'],
  ["introPlatform", "IntroPlatformSection", '<section id="intro-section"'],
  ["aiTitle", "AiTitleSection", '<section data-lottie-stop-percent="0.5" data-title-section="tools"'],
  ["aiGenerate", "AiGenerateSection", '<section data-eyes-wrapper="true" data-lottie-sequence-section="true" class="section generate-section"'],
  ["collaborationTitle", "CollaborationTitleSection", '<section data-lottie-stop-percent="0.6" data-title-section="workflow"'],
  ["collaboration", "CollaborationSection", '<section data-eyes-wrapper="true" data-lottie-sequence-section="true" class="section">'],
  ["footer", "FlimFooter", '<footer class="footer"'],
  ["cursor", "FlimCursor", '<div id="custom-cursor"'],
]
  .map(([id, component, needle]) => ({ id, component, index: bodyHtml.indexOf(needle) }))
  .filter((marker) => marker.index >= 0)
  .sort((a, b) => a.index - b.index);

const sections = markers.map((marker, index) => ({
  id: marker.id,
  component: marker.component,
  html: bodyHtml.slice(marker.index, markers[index + 1]?.index ?? bodyHtml.length).trim(),
}));

const headFragment = parse5.parseFragment(cleanHead.trim());

const textValues = [];
const assetValues = [];
const textIndex = new Map();
const assetIndex = new Map();

const remember = (map, list, value) => {
  if (!map.has(value)) {
    map.set(value, list.length);
    list.push(value);
  }
  return map.get(value);
};

const propName = (name) => {
  const map = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    crossorigin: "crossOrigin",
    "accept-charset": "acceptCharset",
    "http-equiv": "httpEquiv",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "clip-path": "clipPath",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-style": "fontStyle",
    "font-weight": "fontWeight",
    charset: "charSet",
    srcset: "srcSet",
    autocomplete: "autoComplete",
    autocapitalize: "autoCapitalize",
    autocorrect: "autoCorrect",
    contenteditable: "contentEditable",
    spellcheck: "spellCheck",
    inputmode: "inputMode",
    maxlength: "maxLength",
    minlength: "minLength",
    enctype: "encType",
    novalidate: "noValidate",
    formnovalidate: "formNoValidate",
    frameborder: "frameBorder",
    allowfullscreen: "allowFullScreen",
    preserveaspectratio: "preserveAspectRatio",
    viewbox: "viewBox",
    "xmlns:xlink": "xmlnsXlink",
    "xlink:href": "xlinkHref",
    "letter-spacing": "letterSpacing",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "color-interpolation-filters": "colorInterpolationFilters",
    "dominant-baseline": "dominantBaseline",
    "text-anchor": "textAnchor",
    "xml:space": "xmlSpace",
    readonly: "readOnly",
    autoplay: "autoPlay",
    playsinline: "playsInline",
  };

  return map[name] || name;
};

const booleanAttrs = new Set([
  "allowFullScreen",
  "async",
  "autoFocus",
  "autoPlay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formNoValidate",
  "hidden",
  "loop",
  "multiple",
  "muted",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "selected",
]);

const assetAttrs = new Set(["src", "href", "poster", "data-poster-url", "data-lottie-path", "data-lottie-path-mobile"]);

const styleObject = (value) => {
  const entries = value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [rawKey, ...rawValue] = item.split(":");
      const key = rawKey
        .trim()
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return [key, rawValue.join(":").trim()];
    });

  return `{ ${entries.map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(", ")} }`;
};

const propsCode = (attrs = []) => {
  const entries = [];

  for (const attr of attrs) {
    const name = propName(attr.name);
    if (name === "style") {
      entries.push(`${JSON.stringify(name)}: ${styleObject(attr.value)}`);
      continue;
    }

    if (booleanAttrs.has(name) && (attr.value === "" || attr.value === attr.name)) {
      entries.push(`${JSON.stringify(name)}: true`);
      continue;
    }

    if (assetAttrs.has(attr.name) && /^https?:\/\//.test(attr.value)) {
      entries.push(`${JSON.stringify(name)}: home.assets[${remember(assetIndex, assetValues, attr.value)}]`);
      continue;
    }

    entries.push(`${JSON.stringify(name)}: ${JSON.stringify(attr.value)}`);
  }

  return entries.length ? `{ ${entries.join(", ")} }` : "null";
};

const nodeCode = (node) => {
  if (node.nodeName === "#text") {
    if (!node.value) return "";
    if (!node.value.trim()) return JSON.stringify(node.value);
    return `home.text[${remember(textIndex, textValues, node.value)}]`;
  }

  if (node.nodeName === "#comment" || node.nodeName === "#documentType") {
    return "";
  }

  const tag = node.tagName || node.nodeName;
  const children = (node.childNodes || []).map(nodeCode).filter(Boolean);
  return `h(${JSON.stringify(tag)}, ${propsCode(node.attrs)}, ${children.join(", ")})`;
};

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const section of sections) {
  const fragment = parse5.parseFragment(section.html);
  const children = fragment.childNodes.map(nodeCode).filter(Boolean);
  const body = children.length === 1 ? children[0] : `h(Fragment, null, ${children.join(", ")})`;
  fs.writeFileSync(
    path.join(outDir, `${section.component}.tsx`),
    `import { createElement as h, Fragment } from "react";\nimport home from "@/data/home.json";\n\nexport default function ${section.component}() {\n  return ${body};\n}\n`,
  );
}

const headChildren = headFragment.childNodes
  .filter((node) => node.nodeName !== "#text" && node.nodeName !== "#comment")
  .map(nodeCode)
  .filter(Boolean);
fs.writeFileSync(
  path.join(outDir, "HeadAssets.tsx"),
  `import { createElement as h, Fragment } from "react";\nimport home from "@/data/home.json";\n\nexport default function HeadAssets() {\n  return h(Fragment, null, ${headChildren.join(", ")});\n}\n`,
);

fs.writeFileSync(
  path.join(outDir, "index.ts"),
  `export { default as HeadAssets } from "./HeadAssets";\n${sections
    .map((section) => `export { default as ${section.component} } from "./${section.component}";`)
    .join("\n")}\n`,
);

const imagePaths = [
  ...source.matchAll(/(?:src|poster|data-poster-url|data-lottie-path(?:-mobile)?|data-src)=(["'])([^"']+\.(?:avif|webp|png|jpe?g|svg|json))(?:\1)/gi),
].map((match) => match[2]);

const srcsets = [...source.matchAll(/srcset="([^"]+)"/gi)].flatMap((match) =>
  match[1]
    .split(",")
    .map((item) => item.trim().split(/\s+/)[0])
    .filter(Boolean),
);

const data = {
  source: existing.source || "https://flim.ai",
  capturedFrom: existing.capturedFrom || "https://flim.ai",
  htmlAttrs,
  bodyAttrs,
  scripts,
  text: textValues,
  assets: assetValues,
  imagePaths: [...new Set([...imagePaths, ...srcsets])],
};

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      components: sections.map((section) => section.component),
      text: textValues.length,
      assets: assetValues.length,
      scripts: scripts.length,
    },
    null,
    2,
  ),
);
