export enum Direction {
  UP = "up",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
}

export const DirectionMap: Record<Direction, string[]> = {
  [Direction.UP]: ["up", "top", "north", "w"],
  [Direction.LEFT]: ["left", "east", "a"],
  [Direction.RIGHT]: ["right", "west", "d"],
  [Direction.BOTTOM]: ["bottom", "down", "south", "s"],
};
