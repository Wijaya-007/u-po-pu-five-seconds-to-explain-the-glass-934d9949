// Five Seconds to Explain the Glass — one sentence, at most 200 characters.
// The cat's defence in its own voice: no apology, no confession — gravity
// did it, the cat was only running a routine stability audit, and the glass
// failed. Complaints go to physics.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Gravity did that. I was conducting a routine stability audit, and the glass failed. File your complaint with physics.";

// Gate: a single sentence of plain text, 1-200 Unicode code points.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`line is ${codePoints} code points, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("line must not have leading/trailing whitespace or double spaces");
}

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Verify the written bytes round-trip exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("written entry does not match the line");
}
console.log(`wrote ${outPath} (${codePoints} chars)`);
console.log(LINE);
