import { EventDTO, IEvent } from "@interfaces/event.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { IGameState } from "@interfaces/game.interface";
import { Direction } from "src/domain/enums/Direction.enum";

export type ObjectsMovedData = {
  ids: string[];
  direction: Direction;
};

export class ObjectsMoved extends AbstractEvent<ObjectsMovedData> {
  static eventName = GameEvents.OBJECTS_MOVED;

  constructor(event: EventDTO<ObjectsMovedData>) {
    super({
      name: GameEvents.OBJECTS_MOVED,
      ...event,
    });
  }

  commit(state: IGameState, event: IEvent): IGameState {
    state.objects = state.objects.map((obj) => {
      if (event.data.ids.includes(obj.id))
        return obj.move(event.data.direction);
      return obj;
    });

    return state;
  }
}
