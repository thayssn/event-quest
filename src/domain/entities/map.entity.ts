import config from "src/config";
import { draw } from "src/utils/logger";
import { IGameState } from "@interfaces/game.interface";
import { Game } from "./game.entity";
import { wait } from "src/utils/wait";

export class Map {
  constructor(private readonly screen: any) {}
  render(state: IGameState) {
    this.screen.cursorTo(process.stdout, 0, 0);
    this.screen.clearScreenDown(process.stdout);
    for (let y = 0; y < config.map.height; y++) {
      let row = "";
      for (let x = 0; x < config.map.width; x++) {
        if (x === state.player.x && y === state.player.y) {
          row += config.player.char; // Player character
        } else {
          row += config.map.char; // Empty space
        }
      }
      draw(row);
    }
  }

  async replay(game: Game) {
    for (const event of game.events) {
      await wait(500);
      this.render(game.consolidate(event.timestamp));
    }
  }
}
