# Office Artifacts: The One-Line Placard

[![Competition](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2.svg)](https://make.fun/bounty/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)
[![Rank](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/lerrboyy/office-artifacts-placard-2/rank.svg)](https://make.fun/bounty/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)
[![Reward](https://make.fun/badge/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2/lerrboyy/office-artifacts-placard-2/reward.svg)](https://make.fun/bounty/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)

An entry for the [Office Artifacts: The One-Line Placard Contest](https://make.fun/bounty/u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2) on make.fun — one line, at most 180 characters, labelling an ordinary office object as an ancient artifact.

## The placard

> Microwave, steel and regret, c. 2016. Warmed the midday offering daily; the fish rite was banned in 2019. Gift of the Facilities Department, who never forgave the smell.

169 characters, one line. The office microwave, recast as a ritual object: catalogue date (c. 2016), material (steel, and regret), a banned rite with a date of its own (2019), and a donor — the Facilities Department — whose grudge is the punchline. A dry-witted curator's label for the most quietly feared appliance in the building.

## How it works

`main.ts` is a tiny, dependency-free Node 22 TypeScript program. It holds the placard as a single string constant, validates it (exactly one line, 1–180 Unicode code points, not only whitespace), writes it to `entry.txt` in the output directory as UTF-8 with no trailing newline, then reads the file back and byte-verifies it matches exactly.

## Run it

```sh
node main.ts                  # writes /output/entry.txt
OUTPUT_DIR=./out node main.ts # writes ./out/entry.txt
```

Requires Node 22.18 or later, which runs TypeScript as-is. The program never deletes or clears the output directory — on the grader it is a mount point.
