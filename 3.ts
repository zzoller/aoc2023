import { sample1, sample2, input } from "./3.input";
import _ from "lodash";

type PartMatch = [
  string, // match str
  number, // startPos
  number // endPos
];

const foundParts = {} as { [key: string]: number };

const isSymbol = (char: string) => char?.match(/[^\.\d]/);

const matches = (str: string, search: RegExp) => {
  const indices = [];
  let match;
  while ((match = search.exec(str)))
    indices.push([match[0], match.index, match.index + match[0].length - 1]);

  return indices as PartMatch[];
};

const numbersInLine = (lines: string[], lineNum: number) => {
  const nums = matches(lines[lineNum], /\d+/g);
  (nums || []).forEach(([num, pos]) => {
    const end = pos + num.length;

    if (
      [
        lines[lineNum][pos - 1],
        lines[lineNum][end],
        lines[lineNum - 1]?.slice(pos === 0 ? 0 : pos - 1, end + 1),
        lines[lineNum + 1]?.slice(pos === 0 ? 0 : pos - 1, end + 1),
      ].some(isSymbol)
    ) {
      foundParts[[pos, "-", lineNum].join()] = parseInt(num);
    }
  });
};

const part1 = (input: string) => {
  const lines = input.split("\n");
  lines.forEach((_, lineIdx) => {
    numbersInLine(lines, lineIdx);
  });
  console.log(_.sum(Object.values(foundParts)));
};

const partIsInSpace = (part: PartMatch, positions: number[]) => {
  return positions.some((pos) => pos >= part[1] && pos <= part[2]);
};

const partsNearGear = (
  lineNum: number,
  pos: number,
  partMap: { [key: number]: PartMatch[] }
) => {
  const parts = [
    ...partMap[lineNum].filter((p) => partIsInSpace(p, [pos - 1, pos + 1])),
    ...partMap[lineNum - 1].filter((p) =>
      partIsInSpace(p, [pos - 1, pos, pos + 1])
    ),
    ...partMap[lineNum + 1].filter((p) =>
      partIsInSpace(p, [pos - 1, pos, pos + 1])
    ),
  ];

  return parts;
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  const lineToParts = Object.fromEntries(
    lines.map((_, idx) => [idx, matches(lines[idx], /\d+/g)])
  );

  const ratios: number[] = [];

  lines.forEach((lines, idx) => {
    const gearPositions = matches(lines, /\*/g).map(([_, pos]) => pos);
    gearPositions.forEach((pos) => {
      const parts = partsNearGear(idx, pos, lineToParts);

      if (parts.length === 2)
        ratios.push(parseInt(parts[0][0]) * parseInt(parts[1][0]));
    });
  });

  console.log(_.sum(ratios));
};

part2(input);
