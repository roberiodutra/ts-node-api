import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(email: string): Promise<T | null> {
    return this.model.findOne({ email });
  }

  public async update(_id: string, obj:Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string): Promise<T | null> {
    return this.model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
