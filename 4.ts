import _ from "lodash";
import { sample, input } from "./input/4";

const matchesToValue = (matches: number) =>
  matches < 3 ? matches : Math.pow(2, matches - 1);

const parseLine = (line: string) => {
  const [winners, entries] = line.split(":")[1].split("|");
  return [
    new Set(winners.split(" ").filter((c) => c)),
    entries.split(" ").filter((c) => c),
  ] as [Set<string>, string[]];
};

const part1 = (input: string) => {
  const scratcherValues = input
    .split("\n")
    .map(parseLine)
    .map(([winners, entries]) => entries.filter((e) => winners.has(e)).length)
    .map(matchesToValue);

  return _.sum(scratcherValues);
};

const part2 = (input: string) => {
  const scratcherValues = input
    .split("\n")
    .map(parseLine)
    .map(([winners, entries]) => entries.filter((e) => winners.has(e)).length);

  const scratcherCount = {} as { [key: number]: number };

  scratcherValues.forEach((v, i) => {
    scratcherCount[i] = 1 + (scratcherCount[i] || 0);
    _.range(scratcherCount[i]).forEach(() => {
      _.range(v).forEach((idx) => {
        const key = i + idx + 1;
        if (key < scratcherValues.length) {
          scratcherCount[key] = 1 + (scratcherCount[key] || 0);
        }
      });
    });
  });
  return _.sum(Object.values(scratcherCount));
};

console.log("part1", part1(input));
console.log("part2", part2(input));
