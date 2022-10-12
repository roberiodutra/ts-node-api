import { IUser } from '../interfaces/IUser';
import { IModel } from '../interfaces/IModel';
import UserModel from '../models/User';

class UserService implements IModel<IUser> {
  constructor(private model = UserModel) {}

  public async create(obj: IUser): Promise<IUser> {
    return this.model.create(obj);
  }

  public async read(): Promise<IUser[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<IUser | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, payload: IUser): Promise<IUser | null> {
    return this.model.update(id, payload);
  }

  public async delete(id: string): Promise<IUser | null> {
    return this.model.delete(id);
  }
}

export default new UserService();
