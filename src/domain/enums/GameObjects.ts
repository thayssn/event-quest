import { Chest } from "../entities/chest.entity";
import { Player } from "../entities/player.entity";

export const ALL_GAME_OBJECTS = [Player, Chest];

export const GAME_OBJECTS_NAMES = ALL_GAME_OBJECTS.map((obj) => obj.name);
