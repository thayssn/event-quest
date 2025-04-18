import { IEntity } from "@interfaces/entity.interface";
import { Reducer } from "../reducer";
import { IEvent } from "@interfaces/event.interface";
import { Exclude, instanceToPlain } from "class-transformer";
import { write } from "bun";
import config from "src/config";

export abstract class AbstractEntity<T> implements IEntity {
  state: any;
  @Exclude()
  protected reducer: Reducer;
  @Exclude()
  protected persistedEvents = [];
  @Exclude()
  protected pendingEvents = [];

  constructor(persistedEvents: IEvent[] = []) {
    this.reducer = new Reducer();
    if (persistedEvents.length > 0) {
      this.persistedEvents = persistedEvents;
      this.state = this.consolidate();
    }
  }

  get events(): IEvent[] {
    return [...this.persistedEvents, ...this.pendingEvents];
  }

  consolidate(date: Date = new Date()): T {
    const eventsToDate = this.events.filter((event) => event.timestamp <= date);
    const currentState = this.reducer.reduce({} as T, eventsToDate);
    return currentState;
  }

  protected async persist(): Promise<this> {
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
