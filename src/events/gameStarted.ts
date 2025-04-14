import { IGameState } from "@interfaces/game.interface";
import { AbstractEvent } from "./abstract.event";
import { Player } from "src/domain/entities/player.entity";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { EventDTO } from "@interfaces/event.interface";

export type GameStartedData = {
  name: string;
  id: string;
  value: string;
};

export class GameStarted extends AbstractEvent<GameStartedData> {
  static eventName = GameEvents.GAME_STARTED;
  constructor(event?: EventDTO<GameStartedData>) {
    super({
      name: GameEvents.GAME_STARTED,
      ...event,
    });
  }

  commit(state: IGameState): IGameState {
    return {
      ...state,
      player: new Player(),
      started: true,
    };
  }
}
