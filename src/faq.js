/* FAQ content pipeline. The two markdown drafts stay the single source of
   truth — we import them raw and parse into categories → questions at load,
   so editing the .md files updates the page with no code changes.

   Each answer carries [Official] / [Community] sourcing markers inline; we
   lift those into `sources` (for the badge) and strip them from the prose. */
import batch1 from "../faq-draft-batch1.md?raw";
import batch2 from "../faq-draft-batch2.md?raw";

export const SOURCE_LEGEND = [
  { key: "Official", text: "Confirmed against Air Canada's own published materials." },
  { key: "Community", text: "Widely reported by experienced flyers, not officially published — a strong pattern, not a guarantee." },
];

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function sourcesFrom(text) {
  const out = [];
  if (/\[Official/i.test(text)) out.push("Official");
  if (/\[Community/i.test(text)) out.push("Community");
  return out;
}

// Remove the [Official] / [Community] / [Official/Community — …] markers.
const stripMarkers = (text) =>
  text.replace(/\[(?:Official|Community)[^\]]*\]\s*/g, "").trim();

// Normalize for search: lowercase, punctuation → spaces (so "add-on",
// "add on" and "addon"-adjacent queries all line up on both sides).
export const normalize = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

function parseBatch(raw) {
  // Drop the title + sourcing-key preamble that precedes the first "## ".
  const idx = raw.indexOf("\n## ");
  const body = idx >= 0 ? raw.slice(idx + 1) : raw;

  const blocks = body
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+$/, ""))
    .filter(Boolean);

  const cats = [];
  let cat = null;
  let item = null;

  const flush = () => {
    if (!item || !cat) return;
    const answer = item._blocks.join("\n\n");
    item.sources = sourcesFrom(answer);
    item.answerMd = stripMarkers(answer);
    item.search = normalize(item.question + " " + item.answerMd);
    delete item._blocks;
    cat.items.push(item);
    item = null;
  };

  for (const block of blocks) {
    const firstLine = block.split("\n")[0].trim();

    if (firstLine.startsWith("## ")) {
      flush();
      const name = firstLine.slice(3).trim();
      cat = { name, id: slug(name), items: [], intro: [] };
      cats.push(cat);
      continue;
    }
    if (/^-{3,}$/.test(firstLine)) continue; // horizontal rule
    // A stray italic note (e.g. "*Next batches planned…*") — skip.
    if (firstLine.startsWith("*") && !firstLine.startsWith("**")) continue;

    // Q&A pairs have no blank line between the bold question and its answer,
    // so both arrive in one block: **question?** followed by the answer body.
    const qm = block.match(/^\*\*([\s\S]+?)\*\*\s*([\s\S]*)$/);
    if (qm) {
      flush();
      item = { question: qm[1].replace(/\s+/g, " ").trim(), _blocks: [] };
      const rest = qm[2].trim();
      if (rest) item._blocks.push(rest);
      continue;
    }

    // Non-question block: a continuation of the current answer, or free text.
    if (item) item._blocks.push(block);
    else if (cat) cat.intro.push(block); // free text (e.g. "Not the same thing")
  }
  flush();
  return cats;
}

export const FAQ_CATEGORIES = [...parseBatch(batch1), ...parseBatch(batch2)];
