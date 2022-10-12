import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
}, {
  timestamps: true,
  versionKey: false,
});

export default model('User', UserSchema);
