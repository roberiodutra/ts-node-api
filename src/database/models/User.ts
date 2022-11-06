import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../../domain/cases/login/interfaces/IUser';
import MongoModel from './MongoModel';

const UserSchema = new Schema<IUser>({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  role: String,
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
