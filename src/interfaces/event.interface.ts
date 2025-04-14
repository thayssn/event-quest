export type EventDTO<T> = {
  id?: string;
  name?: string;
  data?: T;
  timestamp?: string;
};

export type EventCommit = (state: any, event: IEvent) => any;

export interface IEvent<T = any> {
  readonly name: string;
  readonly data: T;
  readonly timestamp: Date;
  commit: EventCommit;
  dump(): string;
}
