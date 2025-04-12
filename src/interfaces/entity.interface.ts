import { IEvent } from "./event.interface";

export interface IEntity {
  state: any;
  consolidate(date: Date): any;
  pushEvents(...events: IEvent[]): IEntity;
  persist(): Promise<IEntity>;
}

export interface IEntityDTO {
  id: string;
  state: IEntity[];
  events: IEvent[];
}
