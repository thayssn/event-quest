import { IGameState } from "@interfaces/game.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { EventDTO, IEvent } from "@interfaces/event.interface";

export type DestroyObjectData = { id: string };

export class DestroyObject extends AbstractEvent<DestroyObjectData> {
  static eventName = GameEvents.DESTROY_OBJECT;
  constructor(event?: EventDTO<DestroyObjectData>) {
    super({
      name: GameEvents.DESTROY_OBJECT,
      ...event,
    });
  }

  commit(state: IGameState, event: IEvent): IGameState {
    return {
      ...state,
      objects: [...state.objects.filter((obj) => obj.id !== event.data.id)],
    };
  }
}
