import { EventDTO, IEvent } from "@interfaces/event.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { IGameState } from "@interfaces/game.interface";
import {
  GameObject,
  GameObjectDTO,
} from "src/domain/entities/gameObject.entity";
import { ALL_GAME_OBJECTS } from "src/domain/enums/GameObjects";

export type ObjectsSpawnedData = GameObject[];

export class ObjectsSpawned extends AbstractEvent<ObjectsSpawnedData> {
  static eventName = GameEvents.OBJECTS_SPAWNED;

  constructor(event: EventDTO<ObjectsSpawnedData>) {
    super({
      name: GameEvents.OBJECTS_SPAWNED,
      ...event,
    });
  }

  commit(state: IGameState, event: IEvent): IGameState {
    const objects = event.data.map((obj: any) => {
      const objectConstructor = ALL_GAME_OBJECTS.find(
        (construct) => construct.name === obj.name
      );
      return new objectConstructor(obj);
    });
    state.objects = [...(state.objects ?? []), ...objects];
    return state;
  }
}
