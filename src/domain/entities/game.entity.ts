import { IGameState } from "@interfaces/game.interface";
import { IEvent } from "@interfaces/event.interface";
import { GameStarted } from "@events/gameStarted";
import { AbstractEntity } from "./abstract.entity";
import { Direction, DirectionMap } from "../enums/Direction.enum";
import { PlayerMoved } from "@events/playerMoved.event";
import { Map } from "./map.entity";
import { wait } from "src/utils/wait";

export class Game extends AbstractEntity<IGameState> {
  declare state: IGameState;

  constructor(persistedEvents: IEvent[] = [], readonly map: Map) {
    super(persistedEvents);
  }

  start() {
    if (this.state?.started) {
      return;
    }

    this.pushEvents(new GameStarted());
  }

  movePlayer(directionLike: string) {
    const [direction] = Object.entries(DirectionMap).find(([key, values]) =>
      values.includes(directionLike)
    );
    this.pushEvents(new PlayerMoved({ data: direction as Direction }));
  }

  render() {
    this.map.render(this.state);
  }

  async replay() {
    for (const event of this.events) {
      await wait(84);
      this.map.render(this.consolidate(event.timestamp));
    }
  }
}
