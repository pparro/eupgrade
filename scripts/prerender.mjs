/* Post-build SEO prerender. The app is a Vite SPA, so every URL ships the same
   index.html — meaning crawlers and social scrapers (which don't run JS) see
   the homepage's title/OG on every route. This bakes the correct <head> into a
   static HTML file per route so /guide, /faq and /routes/* have the right
   title, description, canonical and OpenGraph tags in the raw HTML. Body stays
   client-rendered (React hydrates as usual). Also emits sitemap.xml.

   Runs automatically after `vite build` (see package.json). */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, PAGE_SEO, routeSeo } from "../src/seo.js";
import { ROUTES } from "../src/routes-data.js";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const shell = readFileSync(join(DIST, "index.html"), "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function headFor(path, seo) {
  const url = SITE + (path === "/" ? "" : path);
  const ogTitle = seo.ogTitle || seo.title;
  const ogDesc = seo.ogDescription || seo.description;
  return shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>\n    <link rel="canonical" href="${esc(url)}" />`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(ogTitle)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(ogDesc)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(ogTitle)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(ogDesc)}$2`);
}

function write(path, html) {
  if (path === "/") {
    writeFileSync(join(DIST, "index.html"), html);
  } else {
    const dir = join(DIST, path.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
}

const urls = [];
console.log("prerender:");

// Static pages (homepage included so it gets a canonical too).
for (const path of ["/", "/guide", "/faq"]) {
  write(path, headFor(path, PAGE_SEO[path]));
  urls.push(path);
  console.log("  ✓", path);
}

// Published route pages.
for (const slug of Object.keys(ROUTES)) {
  const path = `/routes/${slug}`;
  write(path, headFor(path, routeSeo(ROUTES[slug])));
  urls.push(path);
  console.log("  ✓", path);
}

// sitemap.xml
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE}${u === "/" ? "" : u}</loc></url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);
console.log("  ✓ sitemap.xml (" + urls.length + " urls)");
