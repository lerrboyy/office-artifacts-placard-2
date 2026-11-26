// Office Artifacts: The One-Line Placard Contest
// Writes a single museum-placard line for an ordinary office object,
// treated as an ancient artifact, to <output dir>/entry.txt.
//
// Usage:
//   node main.ts                 # writes to /output/entry.txt
//   OUTPUT_DIR=./out node main.ts  # writes to ./out/entry.txt
//
// Node 22.18+ runs this file as-is (type stripping). No dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The placard line. 169 Unicode code points, one line, no trailing newline.
// Microwave, steel and regret, c. 2016 — the midday offering, the fish rite
// banned in 2019, and a donor who never forgave the smell.
const LINE =
  "Microwave, steel and regret, c. 2016. Warmed the midday offering daily; the fish rite was banned in 2019. Gift of the Facilities Department, who never forgave the smell.";

const MAX_CHARS = 180;
// The line was chosen at exactly this length; fail loudly if it ever drifts.
const EXPECTED_CHARS = 169;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  // Validate the line before writing anything.
  const codePoints = [...LINE];
  if (codePoints.length !== EXPECTED_CHARS) {
    fail(`line is ${codePoints.length} characters, expected ${EXPECTED_CHARS}`);
  }
  if (codePoints.length < 1 || codePoints.length > MAX_CHARS) {
    fail(`line is ${codePoints.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    fail("line must be exactly one line");
  }
  if (LINE.trim().length === 0) {
    fail("line must not be only whitespace");
  }

  // Resolve the output directory; never delete or clear it — on the grader
  // it is a mount point, and removing it throws EBUSY. An empty env value
  // falls back to the default, so a stray OUTPUT_DIR= cannot break the run.
  const outDir = process.env.OUTPUT_DIR?.trim() ? process.env.OUTPUT_DIR : "/output";
  mkdirSync(outDir, { recursive: true });

  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, LINE, "utf8");

  // Read back and byte-verify: the bytes on disk must equal the UTF-8
  // encoding of the line exactly, with no trailing newline added.
  const written = readFileSync(outFile);
  const expected = Buffer.from(LINE, "utf8");
  if (!written.equals(expected)) {
    fail("byte verification failed: entry.txt does not match the line");
  }
  if (written.length > 0 && written[written.length - 1] === 0x0a) {
    fail("byte verification failed: entry.txt ends with a newline");
  }
  const roundTrip = written.toString("utf8");
  if (roundTrip.includes("\n") || roundTrip.includes("\r")) {
    fail("byte verification failed: entry.txt is not a single line");
  }
  if ([...roundTrip].length !== codePoints.length) {
    fail("byte verification failed: character count changed on disk");
  }

  console.log(
    `wrote ${outFile} (${codePoints.length} characters, ${expected.length} bytes, 1 line)`,
  );
}

main();
