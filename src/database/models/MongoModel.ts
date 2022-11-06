import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: typeof Model) { }

  public async create(obj: T) {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(_id: string) {
    return this.model.findOne({ _id });
  }

  public async readByEmail(email: string) {
    return this.model.findOne({ email });
  }

  public async update(_id: string, obj: Partial<T>) {
    return this.model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string) {
    return this.model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
