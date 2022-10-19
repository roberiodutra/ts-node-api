import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IQuestion } from '../../domain/cases/questions/interfaces/IQuestion';
import MongoModel from './MongoModel';

const QuestionSchema = new Schema<IQuestion>({
  userId: String,
  author: String,
  question: String,
  answer: String,
  status: String,
}, {
  timestamps: true,
  versionKey: false,
});

class Question extends MongoModel<IQuestion> {
  constructor(model = mongooseCreateModel('Question', QuestionSchema)) {
    super(model);
  }
}

export default new Question();
