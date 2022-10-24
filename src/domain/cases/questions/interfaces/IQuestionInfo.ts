import { IQuestion } from "./IQuestion";

export interface IQuestionInfo extends IQuestion {
  _id: string,
  createdAt: string,
  updatedAt: string,
}

export interface IQuestionCount extends IQuestionInfo {
  total: [{ count: number }];
}
