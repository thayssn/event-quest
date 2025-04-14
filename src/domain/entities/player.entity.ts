import { Direction } from "../enums/Direction.enum";
import config from "src/config";

type Position = {
  x: number;
  y: number;
};

export class Player {
  health: number;
  x: number;
  y: number;

  constructor() {
    Object.assign(this, {
      health: config.player.maxHealth,
      ...config.player.startPosition,
    });
  }

  heal(qty: number) {
    this.health = Math.max(this.health + qty, config.player.maxHealth);
    return this;
  }

  damage(qty: number) {
    this.health = Math.min(this.health - qty, 0);
    return this;
  }

  respawn(position: Position) {
    this.x = position.x;
    this.y = position.y;
    return this;
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        this.y = Math.max(this.y - 1, 0);
        break;
      case Direction.DOWN:
        this.y = Math.min(this.y + 1, config.map.height - 1);
        break;
      case "left":
        this.x = Math.max(this.x - 1, 0);
        break;
      case "right":
        this.x = Math.min(this.x + 1, config.map.width - 1);
        break;
    }

    return this;
  }
}
