export type EventDTO = Omit<IEvent, "commit" | "dump">;

export type EventCommit = (state: any, event: EventDTO) => any;

export interface IEvent<T = any> {
  readonly data: T;
  readonly timestamp: Date;
  commit: EventCommit;
  dump(): string;
}
