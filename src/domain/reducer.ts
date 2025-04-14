import { EventCommit, EventDTO, IEvent } from "@interfaces/event.interface";

export type EventHandlers = Record<string, EventCommit>;

export class Reducer {
  constructor() {}

  reduce<T>(state: T, events: IEvent[]): T {
    return events.reduce((state, currentEvent) => {
      return currentEvent.commit(state, currentEvent) as T;
    }, state);
  }
}
