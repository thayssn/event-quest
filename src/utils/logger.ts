import chalk from "chalk";
import config from "src/config";

export const warn = (args: string) => {
  console.log(chalk.yellow.bold(args));
};

export const danger = (args: string) => {
  console.log(chalk.red.bold(args));
};

export const success = (args: string) => {
  console.log(chalk.greenBright.bold(args));
};

export const log = (args: string) => {
  console.log(chalk.gray.bold(args));
};

export const debug = (...args: string[]) => {
  console.log(chalk.white.bgCyanBright.bold(...args));
};

export const draw = (chars: string) => {
  const coloredChars = chars
    .split("")
    .map((char) => {
      switch (char) {
        case config.player.char:
          return chalk.greenBright.bold(char);
        case config.map.char:
          return chalk.gray(char);
      }
      return char;
    })
    .join("");
  console.log(coloredChars);
};
