import { IQuestion } from "./IQuestion";

export interface IUserInfo extends IQuestion {
  _id: string,
  createdAt: string,
  updatedAt: string,
}
