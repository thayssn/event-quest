import { EventDTO, IEvent } from "./event.interface";

export interface IEntity {
  state: any;
  consolidate(date: Date): any;
  pushEvents(...events: IEvent[]): IEntity;
}

export interface IEntityDTO {
  id: string;
  state: any;
  events: EventDTO[];
}
