import { IUser } from "./IUser";

export interface IUserInfo extends IUser {
  _id: string,
  createdAt: string,
  updatedAt: string,
}
