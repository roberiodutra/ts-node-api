import { IFilterQuestions } from "../../domain/cases/questions/interfaces/IFilterQuestions";

export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(page: number, limit: number): Promise<IFilterQuestions>;
  readOne(id: string): Promise<T>;
  update(id: string, obj: T): Promise<T>;
  delete(id: string): Promise<void>;
}
