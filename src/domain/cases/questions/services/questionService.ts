import { IQuestion, QuestionSchema } from '../interfaces/IQuestion';
import QuestionModel from '../../../../database/models/Question';
import { ErrorTypes } from '../../../../helpers/ErrorCatalog';

class QuestionService {
  constructor(private model = QuestionModel) {}

  public async create(obj: IQuestion) {
    const parsed = QuestionSchema.safeParse(obj);
  
    if (!parsed.success) throw parsed.error;

    return await this.model.create(obj);
  }

  public read(): Promise<IQuestion[]> {
    return this.model.read();
  }

  public readOne(id: string): Promise<IQuestion> {
    return this.model.readOne(id);
  }

  public update(id: string, payload: IQuestion): Promise<IQuestion> {
    return this.model.update(id, payload);
  }

  public delete(id: string): Promise<void> {
    return this.model.delete(id);
  }
}

export default new QuestionService();
