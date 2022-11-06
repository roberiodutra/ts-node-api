import { IUser, UserSchema } from '../interfaces/IUser';
import UserModel from '../../../../database/models/User';
import Bcrypt from '../../../../helpers/Bcrypt';
import tokenGenerator from '../../../../helpers/TokenGenerator';
import { ErrorTypes } from '../../../../helpers/ErrorCatalog';

class UserService {
  constructor(private model = UserModel) { }

  public async create(obj: IUser) {
    const parsed = UserSchema.safeParse(obj);
    const { email, password } = obj;

    if (!parsed.success) throw parsed.error;

    const userExists = await this.model.readByEmail(email);
    if (userExists) throw new Error(ErrorTypes.UserExists);

    const encryptPass = await Bcrypt.hashPass(password);
    const user = await this.model.create({ ...obj, password: encryptPass });

    const userInfo = {
      id: user._id,
      email,
      role: user.role,
      fullName: `${user.firstName} ${user.lastName}`,
    };
    const { token } = tokenGenerator(userInfo);

    return ({ ...userInfo, token });
  }

  public async login(email: string, pass: string) {
    const user = await this.model.readByEmail(email);
    if (!user) throw new Error(ErrorTypes.UserNotFound);

    const checkPass = await Bcrypt.comparePass(pass, user.password);
    if (!checkPass) throw new Error(ErrorTypes.WrongPassword);

    const userInfo = {
      id: user._id,
      email,
      role: user.role,
      fullName: `${user.firstName} ${user.lastName}`,
    };
    const { token } = tokenGenerator(userInfo);

    return ({ ...userInfo, token });
  }

  public readOne(id: string) {
    return this.model.readOne(id);
  }

  public update(id: string, payload: IUser) {
    return this.model.update(id, payload);
  }

  public delete(id: string) {
    return this.model.delete(id);
  }
}

export default new UserService();
