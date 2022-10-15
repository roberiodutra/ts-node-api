import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../../domain/cases/login/interfaces/IUser';
import MongoModel from './MongoModel';

const QuestionSchema = new Schema({
  userId: String,
  question: String,
  answer: String,
}, {
  timestamps: true,
  versionKey: false,
});

class Question extends MongoModel {
  constructor(model = mongooseCreateModel('Question', QuestionSchema)) {
    super(model);
  }
}

export default new Question();
