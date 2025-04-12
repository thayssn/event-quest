import { IGameState } from "@interfaces/game.interface";
import { EventHandlers, Reducer } from "../reducer";
import { EventDTO } from "@interfaces/event.interface";
import { GameStarted } from "@events/gameStarted";
import { AbstractEntity } from "./abstract.entity";
import { Direction, DirectionMap } from "../enums/Direction.enum";
import { GameEvents } from "../enums/GameEvents.enum";
import { PlayerMoved } from "@events/playerMoved.event";
import config from "src/config";
import { draw } from "src/utils/logger";

const GameEventHandlers: EventHandlers = {
  [GameEvents.GAME_STARTED]: GameStarted.commit,
  [GameEvents.PLAYER_MOVED]: PlayerMoved.commit,
};

export class Game extends AbstractEntity {
  declare state: IGameState;

  constructor(persistedEvents: EventDTO[] = []) {
    super(new Reducer(GameEventHandlers), persistedEvents);
  }

  start() {
    if (this.state?.started) {
      return;
    }

    this.pushEvents(new GameStarted()).persist();
  }

  movePlayer(directionLike: string) {
    const [direction] = Object.entries(DirectionMap).find(([key, values]) =>
      values.includes(directionLike)
    );
    this.pushEvents(new PlayerMoved(direction as Direction));
  }

  render(renderer: any) {
    renderer.clearScreenDown(process.stdout);
    for (let y = 0; y < config.map.height; y++) {
      let row = "";
      for (let x = 0; x < config.map.width; x++) {
        if (x === this.state.player.x && y === this.state.player.y) {
          row += config.player.char; // Player character
        } else {
          row += config.map.char; // Empty space
        }
      }
      draw(row);
    }
  }
}
