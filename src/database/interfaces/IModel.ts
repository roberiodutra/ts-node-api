export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T>;
  readByEmail(email: string): Promise<T>;
  update(id: string, obj: T): Promise<T>;
  delete(id: string): Promise<void>;
}
