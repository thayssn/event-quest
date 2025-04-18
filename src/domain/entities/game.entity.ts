import { IGameState } from "@interfaces/game.interface";
import { IEvent } from "@interfaces/event.interface";
import { GameStarted } from "@events/gameStarted";
import { AbstractEntity } from "./abstract.entity";
import { Direction, DirectionMap } from "../enums/Direction.enum";
import { PlayerMoved } from "@events/playerMoved.event";
import { Map } from "./map.entity";
import { wait } from "src/utils/wait";

const UPDATE_RATE = 60;

export class Game extends AbstractEntity<IGameState> {
  declare state: IGameState;
  loop = null;
  is_replaying = false;

  constructor(persistedEvents: IEvent[] = [], readonly map: Map) {
    super(persistedEvents);
  }

  start() {
    if (!this.state?.started) {
      this.pushEvents(new GameStarted());
    }
    this.resume();
  }

  pause() {
    clearInterval(this.loop);
    this.loop = null;
  }

  resume() {
    this.loop = setInterval(() => {
      this.render();
    }, UPDATE_RATE);
  }

  movePlayer(directionLike: string) {
    if (this.is_replaying) return;
    const [direction] = Object.entries(DirectionMap).find(([key, values]) =>
      values.includes(directionLike)
    );
    this.pushEvents(new PlayerMoved({ data: direction as Direction }));
  }

  interact() {
    console.log("EXPLORE");
  }

  render() {
    this.map.render(this.state);
  }

  async save() {
    await this.persist();
  }

  async replay() {
    if (this.is_replaying) return;
    this.is_replaying = true;
    this.pause();
    for (const event of this.events) {
      await wait(84);
      this.map.render(this.consolidate(event.timestamp));
    }
    this.is_replaying = false;
    console.log("stopped");
  }
}
