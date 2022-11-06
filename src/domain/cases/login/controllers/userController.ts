import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private service = UserService) { }

  public create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.service.login(email, password);
    return res.status(200).json(user);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.readOne(id);
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.update(id, req.body);
    return res.status(200).json(result);
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.readOne(id);
    await this.service.delete(id);
    return res.status(204).end();
  };
}

export default new UserController();
