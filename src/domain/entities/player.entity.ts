import config from "src/config";
import { GameObject, GameObjectDTO } from "./gameObject.entity";
import { Position } from "@interfaces/position.type";
import chalk from "chalk";

interface PlayerDTO extends GameObjectDTO {
  health: number;
}

export class Player extends GameObject {
  health: number;
  name = Player.name;
  char = chalk.green("@");

  constructor(playerDTO?: PlayerDTO) {
    super(playerDTO);
    this.health = playerDTO?.health ?? config.player.maxHealth;
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
    this.position = { x: position.x, y: position.y };
    return this;
  }
}
