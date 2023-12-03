import _ from "lodash";
import { sample1, sample2, input } from "./input/1";

// part1
const countSum = (input: string) => {
  const nums = input.split("\n").map((line) => {
    const matches = line.match(/\d/g);
    return parseInt(((matches?.at(0) as string) + matches?.at(-1)) as string);
  });

  return _.sum(nums);
};

console.log("part1", countSum(input));

// part2
const valueMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
} as { [key: string]: string };

const part2 = (input: string) => {
  const nums = input.split("\n").map((line) => {
    const matches = Object.keys(valueMap)
      .flatMap(
        (key) =>
          [
            [line.indexOf(key), key],
            [line.lastIndexOf(key), key],
          ] as [number, string][]
      )
      .filter(([idx]) => idx >= 0);

    const ordered = _.sortBy(matches, (match) => match[0]).map(
      (match) => match[1]
    );
    const firstNum = ordered[0];
    const lastNum = ordered[ordered.length - 1];

    return parseInt(valueMap[firstNum] + valueMap[lastNum]);
  });
  return _.sum(nums);
};

console.log("part2", part2(input));
