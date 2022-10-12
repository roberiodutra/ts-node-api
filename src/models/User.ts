import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModel';

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
}, {
  timestamps: true,
  versionKey: false,
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', UserSchema)) {
    super(model);
  }
}

export default new User();
