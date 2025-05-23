import { GameObject } from "src/domain/entities/gameObject.entity";
import { Player } from "src/domain/entities/player.entity";

export interface IItem {
  name: string;
  description: "string";
  type: "potion";
  use(Player: Player): void;
}

export interface IGameState {
  started: true;
  items: IItem[];
  value: string;
  player: Player;
  objects: GameObject[];
  inventory: string[];
}
