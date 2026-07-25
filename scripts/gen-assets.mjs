/* Generates the raster brand assets from the locked logo mark + palette.
   Run with: npm run gen:assets   (requires the `sharp` devDependency)

   Outputs into public/:
     favicon-16.png, favicon-32.png, favicon-512.png   — green tile + check
     apple-touch-icon.png (180)                         — same, full-bleed
     og.png (1200x630)                                  — share card
   Fonts: the OG card uses Helvetica/Arial (present on every macOS/CI image)
   so text always rasterizes; the live site itself uses Plus Jakarta Sans. */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
await mkdir(OUT, { recursive: true });

const GREEN = "#097A54";
const GREEN_BRIGHT = "#0C9A6C";
const SLATE = "#2E3538";
const INK2 = "#565F62";
const BG = "#F6F5F2";
const BG2 = "#EDEBE5";
const LINE = "#E4E1D9";

// Full-bleed logo tile (favicons want the mark to fill the frame).
const tileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="11" fill="${GREEN}"/>
  <path d="M11 21 L17 27 L29 12" stroke="#fff" stroke-width="4.8"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`;

async function png(svg, size, name) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(OUT, name));
  console.log("  ✓", name, `(${size}px)`);
}

console.log("favicons:");
await png(tileSvg, 16, "favicon-16.png");
await png(tileSvg, 32, "favicon-32.png");
await png(tileSvg, 180, "apple-touch-icon.png");
await png(tileSvg, 512, "favicon-512.png");

// 1200x630 share card, stone background with the green mark + wordmark.
const font = `-apple-system, Helvetica, Arial, sans-serif`;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${BG2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="${GREEN}"/>

  <!-- brand lockup -->
  <g transform="translate(90,86)">
    <rect width="86" height="86" rx="24" fill="${GREEN}"/>
    <path d="M24 46 L38 60 L64 26" stroke="#fff" stroke-width="10.5"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="112" y="62" font-family="${font}" font-size="46" font-weight="800"
          letter-spacing="-1"><tspan fill="${SLATE}">eupgrade</tspan><tspan fill="${GREEN_BRIGHT}">.me</tspan></text>
  </g>

  <text x="90" y="330" font-family="${font}" font-size="82" font-weight="800"
        letter-spacing="-2.5" fill="${SLATE}">Will your Air Canada</text>
  <text x="90" y="420" font-family="${font}" font-size="82" font-weight="800"
        letter-spacing="-2.5"><tspan fill="${SLATE}">upgrade</tspan><tspan fill="${GREEN}" dx="26">clear?</tspan></text>

  <text x="92" y="495" font-family="${font}" font-size="31" font-weight="500" fill="${INK2}">See what an eUpgrade costs, when your window opens, and</text>
  <text x="92" y="537" font-family="${font}" font-size="31" font-weight="500" fill="${INK2}">whether it's worth it — free, for any route, fare &amp; status.</text>

  <rect x="90" y="576" width="1020" height="1" fill="${LINE}"/>
  <text x="90" y="606" font-family="${font}" font-size="24" font-weight="700" fill="${GREEN}">eupgrade.me</text>
</svg>`;

console.log("share card:");
await sharp(Buffer.from(ogSvg)).png().toFile(join(OUT, "og.png"));
console.log("  ✓ og.png (1200x630)");
console.log("done.");
