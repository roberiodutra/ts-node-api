import { IUser } from '../../../../database/interfaces/IUser';
import { IModel } from '../../../../database/interfaces/IModel';
import UserModel from '../../../../database/models/User';

class UserService implements IModel<IUser> {
  constructor(private model = UserModel) {}

  public create(obj: IUser): Promise<IUser> {
    return this.model.create(obj);
  }

  public read(): Promise<IUser[]> {
    return this.model.read();
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
