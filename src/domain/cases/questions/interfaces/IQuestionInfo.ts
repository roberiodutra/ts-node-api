import { IQuestion } from "./IQuestion";

export interface IQuestionInfo extends IQuestion {
  _id: string,
  createdAt: string,
  updatedAt: string,
}
