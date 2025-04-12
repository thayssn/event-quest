import { IEvent } from "@interfaces/event.interface";
import { randomUUIDv7 } from "bun";

export abstract class AbstractEvent<T = any> implements IEvent {
  id: string;
  data: T;
  timestamp: Date;
  name: string;

  constructor(name: string, data?: T, id?: string) {
    this.name = name;
    this.id = id ?? randomUUIDv7();
    this.timestamp = new Date();
    this.data = data;
  }

  commit(state: any, event: IEvent): any {
    throw new Error("Method not implemented");
  }

  dump() {
    return JSON.stringify(this, null, 2);
  }
}
