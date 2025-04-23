import { Position } from "@interfaces/position.type";
import { deepEquals, randomUUIDv7 } from "bun";
import { getRandomPosition } from "src/utils/randomPosition";
import config from "src/config";
import { Direction } from "../enums/Direction.enum";

export type GameObjectDTO = {
  id?: string;
  position?: Position;
  name: string;
};

export class GameObject {
  position: Position;
  char: string;
  id: string;
  name: string;

  constructor(gameObjectDTO?: GameObjectDTO) {
    this.position = gameObjectDTO?.position ?? getRandomPosition();
    this.id = gameObjectDTO?.id ?? randomUUIDv7();
  }

  respawn(position: Position = { x: 0, y: 0 }): this {
    this.position = { x: position.x, y: position.y };
    return this;
  }

  damage(qty: number) {
    throw new Error("Method not implemented");
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        this.position = {
          x: this.position.x,
          y: Math.max(this.position.y - 1, 0),
        };
        break;
      case Direction.DOWN:
        this.position = {
          x: this.position.x,
          y: Math.min(this.position.y + 1, config.map.height - 1),
        };
        break;
      case "left":
        this.position = {
          x: Math.max(this.position.x - 1, 0),
          y: this.position.y,
        };
        break;
      case "right":
        this.position = {
          x: Math.min(this.position.x + 1, config.map.width - 1),
          y: this.position.y,
        };
        break;
    }

    return this;
  }

  isInPosition(position: Position): boolean {
    return deepEquals(this.position, position);
  }
}
