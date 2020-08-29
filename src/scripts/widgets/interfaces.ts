export interface IWidget {
  start(): void;
  stop(): void;
}

export interface IShape<T> {
  update(args: T): void;
}
