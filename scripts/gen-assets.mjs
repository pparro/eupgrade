/* Generates the raster favicon set from the locked logo mark.
   Run with: npm run gen:assets   (requires the `sharp` devDependency)

   Outputs into public/:
     favicon-16.png, favicon-32.png, favicon-512.png   — green tile + check
     apple-touch-icon.png (180)                         — same, full-bleed

   NOTE: public/og.png (the 1200x630 share card) is NOT generated here — it's
   a Higgsfield-generated image cropped to size. Don't recreate it in this
   script or it'll clobber the designed card. */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
await mkdir(OUT, { recursive: true });

const GREEN = "#097A54";

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
console.log("done.");
