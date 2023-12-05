import _ from "lodash";
import { sample1, input } from "./input/5";

type rangeMap = {
  low: number;
  high: number;
  offset: number;
};

type typeMap = {
  from: string;
  to: string;
  ranges: rangeMap[];
};

const lineToRangeMap = (line: string) => {
  const [to, from, size] = line.split(" ").map((s) => parseInt(s));
  return {
    low: from,
    high: from + size - 1,
    offset: to - from,
  };
};

const parseMaps = (input: string) => {
  const maps: typeMap[] = [];

  let crntMap: typeMap | null = null;
  for (const line of input.split("\n").slice(2)) {
    if (!line.trim()) continue;

    const mapLine = line.match(/(\w+)-to-(\w+)/);
    if (mapLine) {
      crntMap = {
        from: mapLine[1],
        to: mapLine[2],
        ranges: [],
      };
      maps.push(crntMap);
      continue;
    }
    crntMap?.ranges.push(lineToRangeMap(line));
  }
  return maps;
};

const searchMaps = (maps: typeMap[], seed: number) => {
  let type = "seed";
  let value = seed;

  while (type !== "location") {
    const map = maps.find((m) => m.from === type);
    const range = map?.ranges.find((r) => value >= r.low && value <= r.high);

    type = map?.to as string;
    value = value + (range?.offset || 0);
  }

  return value;
};

const part1 = (input: string) => {
  const maps = parseMaps(input);
  const seeds = input
    .split("seeds:")[1]
    .split("\n")[0]
    .split(" ")
    .filter((s) => s)
    .map((s) => parseInt(s.trim()));

  const locations = seeds.map((seed) => searchMaps(maps, seed));

  return Math.min(...locations);
};

const part2 = (input: string) => {
  const maps = parseMaps(input);
  const seedPairs = input
    .split("seeds:")[1]
    .split("\n")[0]
    .split(" ")
    .filter((s) => s)
    .map((s) => parseInt(s.trim()));

  let lowestLocation = Number.POSITIVE_INFINITY;
  for (let i = 0; i < seedPairs.length; i += 2) {
    for (let j = seedPairs[i]; j < seedPairs[i] + seedPairs[i + 1]; j++) {
      // brutal
      lowestLocation = Math.min(lowestLocation, searchMaps(maps, j));
    }
  }

  return lowestLocation;
};

console.log("part1", part1(input));
console.log("part2", part2(input));
