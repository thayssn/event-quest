export enum Direction {
  UP = "up",
  LEFT = "left",
  RIGHT = "right",
  DOWN = "bottom",
}

export const DirectionMap: Record<Direction, string[]> = {
  [Direction.UP]: ["up", "top", "north", "w"],
  [Direction.LEFT]: ["left", "east", "a"],
  [Direction.RIGHT]: ["right", "west", "d"],
  [Direction.DOWN]: ["bottom", "down", "south", "s"],
};
