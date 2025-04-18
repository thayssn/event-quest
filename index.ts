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
  console.log("key.name", key.name);
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
    case "r":
      await game.replay();
      break;
    case "s":
      await game.save();
      break;
    case "q":
      process.exit(0);
    case "space":
      game.interact();
      break;
    default:
      break;
  }
});

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();
