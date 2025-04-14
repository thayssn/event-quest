import { EventDTO, IEvent } from "@interfaces/event.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { IGameState } from "@interfaces/game.interface";
import { Direction } from "src/domain/enums/Direction.enum";

export type PlayerMovedData = Direction;

export class PlayerMoved extends AbstractEvent<PlayerMovedData> {
  static eventName = GameEvents.PLAYER_MOVED;

  constructor(event: EventDTO<PlayerMovedData>) {
    super({
      name: GameEvents.PLAYER_MOVED,
      ...event,
    });
  }

  commit(state: IGameState, event: IEvent): IGameState {
    state.player.move(event.data);
    return state;
  }
}
