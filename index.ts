import readline from "readline";
import config from "src/config";
import { Game } from "src/domain/entities/game.entity";
import { Map } from "src/domain/entities/map.entity";
import { Direction } from "src/domain/enums/Direction.enum";
import { EventFactory } from "src/domain/factories/event.factory";

const file = Bun.file(config.database.path);
const data = await file.json();
const events = new EventFactory().createMany(data);
const map = new Map(readline);
const game = new Game(events, map);
game.start();

readline.emitKeypressEvents(process.stdin);
process.stdin.on("keypress", async (ch, key) => {
  switch (key.name) {
    case "up":
      game.movePlayer(Direction.UP);
      break;
    case "down":
      game.movePlayer(Direction.DOWN);
      break;
    case "left":
      game.movePlayer(Direction.LEFT);
      break;
    case "right":
      game.movePlayer(Direction.RIGHT);
      break;
    case "q":
      process.exit(0);
    case "r":
      await game.replay();
      return;
    default:
      break;
  }
  game.render();
  await game.persist();
});

game.render();

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();

// const directionLikes = flatten(Object.values(DirectionMap));
// const commands: Record<string, (cmd: string, args?: string[]) => void> = {
//   move: (cmd: string, args: string[]) => {
//     const [direction] = args;
//     if (!directionLikes.includes(direction)) warn(`Invalid direction`);
//     game.movePlayer(direction);
//   },
//   reprocess: (cmd: string) => {},
// };

// rl.on("line", async (line) => {
//   const [cmd, ...args] = line.trim().split(" ");
//   commands[cmd](cmd, args);
//   await game.persist();
//   map.render(game.state);
// });
