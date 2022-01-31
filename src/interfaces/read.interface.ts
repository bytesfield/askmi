export interface IRead<T> {
  find(condition: object): Promise<T[]>;
  findOne(id: number): Promise<T>;
}