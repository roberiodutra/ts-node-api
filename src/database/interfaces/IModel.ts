import { IUser } from "../../domain/cases/login/interfaces/IUser";
import { IUserInfo } from "../../domain/cases/login/interfaces/IUserInfo";

export interface IModel {
  create(obj: IUser): Promise<IUserInfo>;
  read(): Promise<IUserInfo[]>;
  readOne(email: string): Promise<IUserInfo>;
  update(id: string, obj: IUser): Promise<IUserInfo>;
  delete(id: string): Promise<void>;
}
