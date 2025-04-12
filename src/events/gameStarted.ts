import { IGameState } from "@interfaces/game.interface";
import { AbstractEvent } from "./abstract.event";
import { Player } from "src/domain/entities/player.entity";
import { GameEvents } from "src/domain/enums/GameEvents.enum";

export type GameStartedData = {
  name: string;
  id: string;
  value: string;
};

export class GameStarted extends AbstractEvent<GameStartedData> {
  constructor() {
    super(GameEvents.GAME_STARTED);
  }

  static commit(state: IGameState): IGameState {
    return {
      ...state,
      player: new Player(),
      started: true,
    };
  }
}
