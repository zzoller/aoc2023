import _ from "lodash";
import { sample1, input } from "./input/6";

const MPS = 1;

const winnersPerTime = (time: number, bestDistance: number) => {
  let numWaysToWin = 0;
  _.range(time).map((t) => {
    const speed = t * MPS;
    const distance = (time - t) * speed;
    if (distance > bestDistance) {
      numWaysToWin++;
    }
  });
  return numWaysToWin;
};

const parseLine = (line: string) => line.match(/\d+/g) as string[];

const part1 = (input: string) => {
  const lines = input.split("\n");
  const times = parseLine(lines[0]).map((t) => parseInt(t));
  const distances = parseLine(lines[1]).map((t) => parseInt(t));

  return times
    .map((t, i) => winnersPerTime(t, distances[i]))
    .reduce((a, b) => a * b);
};

const part2 = (input: string) => {
  const lines = input.split("\n");
  const time = parseInt(parseLine(lines[0]).join(""));
  const distance = parseInt(parseLine(lines[1]).join(""));
  return winnersPerTime(time, distance);
};

console.log("part1", part1(input));
const now = performance.now();
console.log("part1", part2(input));
console.log("time", performance.now() - now);
