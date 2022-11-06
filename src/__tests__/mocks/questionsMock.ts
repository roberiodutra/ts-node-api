import { IQuestionCount } from "../../domain/cases/questions/interfaces/IQuestionInfo";

const questionMock = {
  _id: "6355da1a6036d69973750c01",
  userId: "634b2a53c85bdce2fbb81e69",
  author: "Tester User",
  question: "What is React?",
  answer: "https://stacovesrflow.com/",
  status: "published",
  createdAt: "2022-10-24T00:19:38.514Z",
  updatedAt: "2022-10-24T07:09:51.934Z"
} as IQuestionCount;

const newQuestion = {
  userId: "634b2a53c85bdce2fbb81e69",
  author: "Tester User",
  question: "What is Node?",
  answer: "https://stacovesrflow.com/",
  status: "pending",
};

const newQuestionsErrorMessages = ['Required'];

export { questionMock, newQuestion, newQuestionsErrorMessages };
