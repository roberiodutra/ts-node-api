import { IUser, UserSchema } from '../interfaces/IUser';
import { IModel } from '../../../../database/interfaces/IModel';
import UserModel from '../../../../database/models/User';
import Bcrypt from '../../../../helpers/Bcrypt';
import tokenGenerator from '../../../../helpers/TokenGenerator';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { IUserInfo } from '../interfaces/IUserInfo';
import { ErrorTypes } from '../../../../helpers/ErrorCatalog';

class UserService implements IModel {
  constructor(private model = UserModel) {}

  public async create(obj: IUser): Promise<ILoggedUser> {
    const { email, password } = obj;
    const parsed = UserSchema.safeParse(obj);
  
    if (!parsed.success) {
      throw parsed.error;
    }

    const userExists = await this.model.readOne(email);
    if (userExists) throw new Error(ErrorTypes.UserExists);

    const encryptPass = await Bcrypt.hashPass(password);
    await this.model.create({ ...obj, password: encryptPass });

    const { token } = tokenGenerator({ email });

    return ({ email, token });
  }

  public read(): Promise<IUserInfo[]> {
    return this.model.read();
  }

  public async login(email: string, pass: string): Promise<ILoggedUser> {
    const user = await this.model.readOne(email);
    if (!user) throw new Error(ErrorTypes.UserNotFound);

    const checkPass = await Bcrypt.comparePass(pass, user.password);
    if (!checkPass) throw new Error(ErrorTypes.WrongPassword);

    const { token } = tokenGenerator({ email });

    return ({ email, token });
  }

  public readOne(email: string): Promise<IUserInfo> {
    return this.model.readOne(email);
  }

  public update(id: string, payload: IUser): Promise<IUserInfo> {
    return this.model.update(id, payload);
  }

  public delete(id: string): Promise<void> {
    return this.model.delete(id);
  }
}

export default new UserService();
