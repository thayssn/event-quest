import { IGameState } from "@interfaces/game.interface";
import { AbstractEvent } from "./abstract.event";
import { GameEvents } from "src/domain/enums/GameEvents.enum";
import { EventDTO, IEvent } from "@interfaces/event.interface";

export type AddItemToInventoryData = string;

export class AddItemToInventory extends AbstractEvent<AddItemToInventoryData> {
  static eventName = GameEvents.ADD_ITEM_TO_INVENTORY;
  constructor(event?: EventDTO<AddItemToInventoryData>) {
    super({
      name: GameEvents.ADD_ITEM_TO_INVENTORY,
      ...event,
    });
  }

  commit(state: IGameState, event: IEvent): IGameState {
    return {
      ...state,
      inventory: [...state.inventory, event.data],
    };
  }
}
