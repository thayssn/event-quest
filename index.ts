import { flatten } from "ramda";
import readline from "readline";
import { Game } from "src/domain/entities/game.entity";
import { Direction, DirectionMap } from "src/domain/enums/Direction.enum";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();

const directionLikes = flatten(Object.values(DirectionMap));
const game = new Game();
game.start();

rl.on("line", async (line) => {
  const [command, ...args] = line.trim().split(" ");
  switch (command) {
    case "move":
      const [direction] = args;
      if (directionLikes.includes(direction)) {
        game.movePlayer(direction);
        game.render(readline);
      } else {
        console.log(`Invalid direction! Try ${Object.values(Direction)}`);
      }
      break;
    case "save":
      await game.persist();
  }
});

game.render(readline);
