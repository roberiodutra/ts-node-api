import { IQuestion, QuestionSchema } from '../interfaces/IQuestion';
import QuestionModel from '../../../../database/models/Question';
import { IQuestionInfo } from '../interfaces/IQuestionInfo';

class QuestionService {
  constructor(private model = QuestionModel) {}

  public async create(obj: IQuestion): Promise<IQuestionInfo> {
    const parsed = QuestionSchema.safeParse(obj);
  
    if (!parsed.success) throw parsed.error;

    return await this.model.create(obj);
  }

  public read(): Promise<IQuestionInfo[]> {
    return this.model.read();
  }

  public readOne(id: string): Promise<IQuestionInfo> {
    return this.model.readOne(id);
  }

  public update(id: string, payload: IQuestion): Promise<IQuestionInfo> {
    return this.model.update(id, payload);
  }

  public delete(id: string): Promise<void> {
    return this.model.delete(id);
  }
}

export default new QuestionService();
