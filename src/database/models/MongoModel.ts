import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: typeof Model) { }

  public async create(obj: T) {
    return this.model.create({ ...obj });
  }

  public async read(page: number, limit: number) {
    const questions = await this.model.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.model.countDocuments();
    return { questions, count };
  }

  public async readOne(_id: string) {
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>) {
    return this.model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string) {
    return this.model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
