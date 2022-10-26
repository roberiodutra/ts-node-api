import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IQuestion } from '../../domain/cases/questions/interfaces/IQuestion';
import { IQuestionCount } from '../../domain/cases/questions/interfaces/IQuestionInfo';
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

  public async filterQuestions(
    page: number,
    limit: number,
    status: string,
    userId: string,
  ): Promise<IQuestionCount[]> {
    const query = userId ? { userId, status } : { status };
    const questions = await this.model.aggregate()
      .match({ ...query })
      .facet({
        questions: [{
          $skip: (page - 1) * limit,
        }, {
          $limit: limit * 1,
        }, {
          $sort: { createdAt: -1 },
        }],
        total: [{ $count: 'count' }],
      });
    return questions[0];
  }
}

export default new Question();
