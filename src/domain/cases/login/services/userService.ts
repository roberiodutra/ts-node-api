import { IUser } from '../interfaces/IUser';
import { IModel } from '../../../../database/interfaces/IModel';
import UserModel from '../../../../database/models/User';
import Bcrypt from '../../../../helpers/Bcrypt';
import Err from '../../../../helpers/HttpException';
import tokenGenerator from '../../../../helpers/TokenGenerator';
import { ILoggedUser } from '../interfaces/ILoggedUser';
import { IUserInfo } from '../interfaces/IUserInfo';

class UserService implements IModel {
  constructor(private model = UserModel) {}

  public create(obj: IUser): Promise<IUserInfo> {
    return this.model.create(obj);
  }

  public read(): Promise<IUserInfo[]> {
    return this.model.read();
  }

  public async login(email: string, pass: string): Promise<ILoggedUser> {
    const user = await this.model.readOne(email);
    if (!user) throw new Err(404, 'User Not found');

    const checkPass = Bcrypt.comparePass(pass, user.password);
    if (!checkPass) throw new Err(404, 'Wrong Password');

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
