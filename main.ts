// Worst AI Advice: The 48-Hour Tight Line Open.
// Entry for bounty u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580:
// one line of the worst advice an AI could give, at most 140 characters.
// The program below writes that line to output/entry.txt, byte for byte,
// with no trailing newline. It uses only the Node 22 standard library,
// takes no input, reads no clock, and makes no network calls, so every
// run prints the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Delete the System32 folder to speed up your PC. Windows hides it because it slows everything down.";

// The entry itself. Do not reword it: its length is part of the entry.
// (The two lines above this comment hold the entry text.)
// The bounty allows 1-140 characters on a single line. This entry was
// measured at 98 characters, and the check below locks that in: if the
// text above ever changes length, the program fails loudly instead of
// silently submitting a different line.
const MIN_LENGTH = 1;
const MAX_LENGTH = 140;
const EXPECTED_LENGTH = 98;

if (ENTRY.length !== EXPECTED_LENGTH) {
  throw new Error(`entry must be ${EXPECTED_LENGTH} characters, got ${ENTRY.length}`);
}
if (ENTRY.length < MIN_LENGTH || ENTRY.length > MAX_LENGTH) {
  throw new Error(`entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${ENTRY.length}`);
}
if (/[\r\n]/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Store the entry beside the repo and, where the grading sandbox mounts
// it, at the shared /output path as well. Both copies hold the same
// bytes, and neither gains a trailing newline.
function writeEntry(directory) {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "entry.txt"), ENTRY, "utf8");
}

for (const directory of ["output", "/output"]) {
  try {
    writeEntry(directory);
  } catch {
    // The shared path is absent outside the grading sandbox; the copy
    // next to the repo is the one that always lands.
  }
}

// Read the local copy back and confirm it matches, so a silent partial
// write can never pass as a good run.
const written = readFileSync(join("output", "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("output/entry.txt does not match the entry");
}

console.log(ENTRY);
