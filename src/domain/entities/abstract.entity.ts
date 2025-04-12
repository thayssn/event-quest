import { IEntity } from "@interfaces/entity.interface";
import { Reducer } from "../reducer";
import { EventDTO, IEvent } from "@interfaces/event.interface";
import { Exclude, instanceToPlain } from "class-transformer";
import { write } from "bun";
import config from "src/config";

export abstract class AbstractEntity implements IEntity {
  state: any;
  @Exclude()
  protected reducer: Reducer;
  @Exclude()
  protected persistedEvents = [];
  @Exclude()
  protected pendingEvents = [];

  constructor(reducer: Reducer, persistedEvents: EventDTO[] = []) {
    this.reducer = reducer;
    if (persistedEvents.length > 0) {
      this.persistedEvents = persistedEvents.sort(
        (a: EventDTO, b: EventDTO) =>
          a.timestamp.getTime() - b.timestamp.getTime()
      );
      this.state = this.consolidate();
    }
  }

  protected get events(): EventDTO[] {
    return [...this.persistedEvents, ...this.pendingEvents];
  }

  consolidate(date: Date = new Date()) {
    const eventsToDate = this.events.filter((event) => event.timestamp <= date);
    const currentState = this.reducer.reduce({}, eventsToDate);
    return currentState;
  }

  async persist(): Promise<this> {
    const eventsToPersist = [...this.persistedEvents, ...this.pendingEvents];
    await write(
      config.database.path,
      JSON.stringify(eventsToPersist, null, 2),
      {
        createPath: true,
      }
    );
    this.persistedEvents = eventsToPersist;
    this.pendingEvents = [];
    return this;
  }

  pushEvents(...events: IEvent[]) {
    this.pendingEvents = [...this.pendingEvents, ...events];
    this.state = this.consolidate();
    return this;
  }

  serialize() {
    return instanceToPlain(this);
  }

  dump() {
    return this.persistedEvents;
  }
}
