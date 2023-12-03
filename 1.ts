import _ from "lodash";
import { sample1, sample2, input } from "./1.input";

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

const countSum2 = (input: string) => {
  const nums = input.split("\n").map((line) => {
    let positions: [number, string][] = [];

    Object.keys(valueMap).map((key) => {
      const pos = line.indexOf(key);
      if (pos !== -1) {
        positions.push([pos, key]);
      }
    });
    positions = _.orderBy(positions, ["0"], ["asc"]);

    return parseInt(
      valueMap[positions[0][1]] + valueMap[positions[positions.length - 1][1]]
    );
  });

  return _.sum(nums);
};

console.log(countSum2(input));
