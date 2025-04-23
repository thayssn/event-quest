import { IGameState } from "@interfaces/game.interface";
import { IEvent } from "@interfaces/event.interface";
import { GameStarted } from "@events/gameStarted";
import { AbstractEntity } from "./abstract.entity";
import { Direction, DirectionMap } from "../enums/Direction.enum";
import { PlayerMoved } from "@events/playerMoved.event";
import { Map } from "./map.entity";
import { wait } from "src/utils/wait";
import { Player } from "./player.entity";
import { Chest } from "./chest.entity";
import { ObjectsSpawned } from "@events/objectsSpawned";
import { ObjectsMoved } from "@events/objectMoved.event";
import { GameObject } from "./gameObject.entity";
import { AddItemToInventory } from "@events/addItemToInventory";
import { DestroyObject } from "@events/destroyObject";

const UPDATE_RATE = 60;
const OBJECTS_UPDATE_RATE = 600;
export class Game extends AbstractEntity<IGameState> {
  declare state: IGameState;
  loops = [];
  is_replaying = false;

  constructor(persistedEvents: IEvent[] = [], readonly map: Map) {
    super(persistedEvents);
  }

  get player(): GameObject {
    return this.state.objects.find((obj) => obj instanceof Player);
  }

  get chests(): Chest[] {
    return this.state.objects.filter((obj) => obj instanceof Chest);
  }

  start() {
    if (!this.events.length) {
      this.pushEvents(new GameStarted());
      this.pushEvents(
        new ObjectsSpawned({ data: [new Player(), new Chest()] })
      );
    }
    this.resume();
  }

  pause() {
    for (const loop of this.loops) {
      clearInterval(loop);
    }
    this.loops = [];
  }

  resume() {
    const playerLoop = setInterval(() => {
      this.render();
    }, UPDATE_RATE);

    const objectsLoops = setInterval(() => {
      this.moveObjects();
    }, OBJECTS_UPDATE_RATE);

    this.loops.push(playerLoop, objectsLoops);
  }

  moveObjects() {
    if (this.is_replaying) return;
    this.pushEvents(
      new ObjectsMoved({
        data: {
          ids: this.chests.map((chest) => chest.id),
          direction: Direction.LEFT,
        },
      })
    );
    this.checks();
  }

  movePlayer(directionLike: string) {
    if (this.is_replaying) return;
    const [direction] = Object.entries(DirectionMap).find(([key, values]) =>
      values.includes(directionLike)
    );
    this.pushEvents(new PlayerMoved({ data: direction as Direction }));
    this.checks();
  }

  checks() {
    const interactions = this.chests.filter((obj) =>
      obj.isInPosition(this.player.position)
    );
    interactions.map((chest) => {
      this.pushEvents(new AddItemToInventory({ data: chest.content }));
      this.pushEvents(new DestroyObject({ data: { id: chest.id } }));
      this.pushEvents(new ObjectsSpawned({ data: [new Chest()] }));
    });
  }

  render() {
    this.map.render(this.state);
  }

  async restart() {
    this.pause();
    await this.clear();
    this.start();
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
