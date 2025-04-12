import { EventDTO } from "@interfaces/event.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { IGameState } from "@interfaces/game.interface";
import { Direction } from "src/domain/enums/Direction.enum";

export type PlayerMovedData = Direction;

export class PlayerMoved extends AbstractEvent<PlayerMovedData> {
  constructor(data: PlayerMovedData) {
    super(GameEvents.PLAYER_MOVED, data);
  }

  static commit(state: IGameState, event: EventDTO): IGameState {
    state.player.move(event.data);
    return state;
  }
}
