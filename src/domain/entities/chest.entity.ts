import chalk from "chalk";
import { GameObject, GameObjectDTO } from "./gameObject.entity";
import { getRandomIndex } from "src/utils/getRandomIndex";
import { Direction } from "../enums/Direction.enum";
import { getRandomPosition } from "src/utils/randomPosition";
import config from "src/config";

const AVAILABLE_ITEMS = ["sword", "health potion", "shield", "orb"];

interface ChestDTO extends GameObjectDTO {
  content: string;
}

export class Chest extends GameObject {
  name = Chest.name;
  content: string;
  char = chalk.yellow("#");

  constructor(chestDTO?: ChestDTO) {
    super(chestDTO);
    this.content = chestDTO?.content ?? this.getRandomContent();
    this.position = chestDTO?.position ?? {
      x: config.map.width,
      y: getRandomPosition().y,
    };
  }

  private getRandomContent() {
    return AVAILABLE_ITEMS.at(getRandomIndex(AVAILABLE_ITEMS.length));
  }

  move(direction: Direction) {
    super.move(direction);
    return this;
  }
}
