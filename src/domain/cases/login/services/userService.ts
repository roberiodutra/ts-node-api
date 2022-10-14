import { IUser } from '../interfaces/IUser';
import { IModel } from '../../../../database/interfaces/IModel';
import UserModel from '../../../../database/models/User';
import Bcrypt from '../../../../helpers/Bcrypt';
import Err from '../../../../helpers/HttpException';
import tokenGenerator from '../../../../helpers/TokenGenerator';
import { ILoggedUser } from '../interfaces/ILoggedUser';

class UserService implements IModel<IUser> {
  constructor(private model = UserModel) {}

  public create(obj: IUser): Promise<IUser> {
    return this.model.create(obj);
  }

  public read(): Promise<IUser[]> {
    return this.model.read();
  }

  public async login(email: string, pass: string): Promise<ILoggedUser> {
    const user = await this.model.readOne(email);
    const checkPass = Bcrypt.comparePass(pass, user?.password);

    if (!checkPass) throw new Err(404, 'Not found');

    const token = tokenGenerator(user?.email);

    return ({ user: user?.email, ...token });
  }

  public readOne(id: string): Promise<IUser | null> {
    return this.model.readOne(id);
  }

  public update(id: string, payload: IUser): Promise<IUser | null> {
    return this.model.update(id, payload);
  }

  public delete(id: string): Promise<IUser | null> {
    return this.model.delete(id);
  }
}

export default new UserService();
