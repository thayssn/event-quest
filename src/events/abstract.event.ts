import { EventDTO, IEvent } from "@interfaces/event.interface";
import { randomUUIDv7 } from "bun";

export abstract class AbstractEvent<T = any> implements IEvent {
  id: string;
  data: T;
  timestamp: Date;
  eventName: string;
  name: string;

  constructor(event: EventDTO<T> = {}) {
    this.name = event?.name;
    this.id = event?.id ?? randomUUIDv7();
    this.timestamp = event?.timestamp ? new Date(event.timestamp) : new Date();
    this.data = event?.data;
  }

  commit(state: any, event: IEvent): any {
    throw new Error("Method not implemented");
  }

  dump() {
    return JSON.stringify(this, null, 2);
  }
}
