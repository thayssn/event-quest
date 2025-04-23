import { AddItemToInventory } from "@events/addItemToInventory";
import { DestroyObject } from "@events/destroyObject";
import { GameStarted } from "@events/gameStarted";
import { ObjectsMoved } from "@events/objectMoved.event";
import { ObjectsSpawned } from "@events/objectsSpawned";
import { PlayerMoved } from "@events/playerMoved.event";
import { EventDTO, IEvent } from "@interfaces/event.interface";

const eventClasses = [
  GameStarted,
  PlayerMoved,
  ObjectsSpawned,
  ObjectsMoved,
  AddItemToInventory,
  DestroyObject,
];

export class EventFactory {
  createMany(data: EventDTO<any>[]): IEvent[] {
    const events = data.map((event) => {
      const construct = eventClasses.find(
        (rel) => rel.eventName === event.name
      );
      if (!construct) throw new Error(`Not able to load event ${event.name}`);
      return new construct(event);
    });

    return events;
  }
}
