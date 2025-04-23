import { Position } from "@interfaces/position.type";
import config from "src/config";
import { getRandomIndex } from "./getRandomIndex";

export const getRandomPosition = (): Position => {
  const maxWidth = config.map.width;
  const maxHeight = config.map.height;

  return { x: getRandomIndex(maxWidth), y: getRandomIndex(maxHeight) };
};
