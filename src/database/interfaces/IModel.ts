import { IQuestionCount } from "../../domain/cases/questions/interfaces/IQuestionInfo";

export interface IModel<T> {
  create(obj: T): Promise<T>;
  read(page: number, limit: number, status: string): Promise<IQuestionCount[]>;
  readOne(id: string): Promise<T>;
  update(id: string, obj: T): Promise<T>;
  delete(id: string): Promise<void>;
}
