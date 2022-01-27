

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: number, item: T): Promise<T>;
  delete(id: number): any;
}