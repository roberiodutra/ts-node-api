import { Model } from 'mongoose';
import { IUser } from '../../domain/cases/login/interfaces/IUser';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel implements IModel {
  constructor(protected model: typeof Model) {}

  public async create(obj: IUser) {
    return this.model.create({ ...obj });
  }

  public async read() {
    return this.model.find();
  }

  public async readOne(_id: string) {
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: IUser) {
    return this.model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string) {
    return this.model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
