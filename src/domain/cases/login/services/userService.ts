import { IUser, UserSchema } from '../interfaces/IUser';
import UserModel from '../../../../database/models/User';
import Bcrypt from '../../../../helpers/Bcrypt';
import tokenGenerator from '../../../../helpers/TokenGenerator';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { IUserInfo } from '../interfaces/IUserInfo';
import { ErrorTypes } from '../../../../helpers/ErrorCatalog';

class UserService {
  constructor(private model = UserModel) {}

  public async create(obj: IUser): Promise<ILoggedUser> {
    const parsed = UserSchema.safeParse(obj);
    const { email, password } = obj;
  
    if (!parsed.success) throw parsed.error;

    const userExists = await this.model.readByEmail(email);
    if (userExists) throw new Error(ErrorTypes.UserExists);

    const encryptPass = await Bcrypt.hashPass(password);
    await this.model.create({ ...obj, password: encryptPass });

    const userInfo = { id: userExists._id, email, role: userExists.role };
    const { token } = tokenGenerator(userInfo);

    return ({ ...userInfo, token });
  }

  public read(): Promise<IUserInfo[]> {
    return this.model.read();
  }

  public async login(email: string, pass: string): Promise<ILoggedUser> {
    const user = await this.model.readByEmail(email);
    if (!user) throw new Error(ErrorTypes.UserNotFound);

    const checkPass = await Bcrypt.comparePass(pass, user.password);
    if (!checkPass) throw new Error(ErrorTypes.WrongPassword);

    const userInfo = { id: user._id, email, role: user.role };
    const { token } = tokenGenerator(userInfo);

    return ({ ...userInfo, token });
  }

  public readOne(id: string): Promise<IUserInfo> {
    return this.model.readOne(id);
  }

  public update(id: string, payload: IUser): Promise<IUserInfo> {
    return this.model.update(id, payload);
  }

  public delete(id: string): Promise<void> {
    return this.model.delete(id);
  }
}

export default new UserService();
