import _ from "lodash";
import { sample, input } from "./input/2";

type Game = {
  num: number;
  rounds: {
    [key: string]: number;
  }[];
};

const gameNum = (line: string) => parseInt(line.split(":")[0].split(" ")[1]);
const getRounds = (line: string) => {
  return line
    .split(":")[1]
    .split(";")
    .map((round) => {
      return Object.fromEntries(
        round.split(",").map((pull) => {
          const [num, color] = pull.trim().split(" ");
          return [color, parseInt(num)];
        })
      );
    });
};

const gameIsPossible = (game: Game, limit: { [color: string]: number }) => {
  const limits = Object.entries(limit);
  return game.rounds.every((round) => {
    return limits.every(([color, num]) => {
      const a = (round[color] || 0) <= num;
      return a;
    });
  });
};

const gamePower = (game: Game) => {
  const highestSet: { [color: string]: number } = {};

  game.rounds.forEach((round) => {
    Object.entries(round).forEach(([color, num]) => {
      if (!highestSet[color] || highestSet[color] < num) {
        highestSet[color] = num;
      }
    });
  });

  let power = 1;
  Object.values(highestSet).forEach((num) => {
    power *= num;
  });
  return power;
};

const games = input.split("\n").map((line) => {
  return {
    num: gameNum(line),
    rounds: getRounds(line),
  };
});

const limit = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleGames = games.filter((game) => gameIsPossible(game, limit));

console.log("part1", _.sum(possibleGames.map((game) => game.num)));
console.log("part2", _.sum(games.map((game) => gamePower(game))));
