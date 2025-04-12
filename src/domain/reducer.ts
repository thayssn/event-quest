import { IEntityState } from "@interfaces/entity.interface";
import { EventCommit, EventDTO } from "@interfaces/event.interface";

export type EventHandlers = Record<string, EventCommit>;

export class Reducer {
  constructor(private readonly eventHandlers: EventHandlers) {}

  reduce<T extends IEntityState>(state: T, events: EventDTO[]): T {
    return events.reduce((state, currentEvent) => {
      return this.eventHandlers[currentEvent.name](state, currentEvent) as T;
    }, state);
  }
}
