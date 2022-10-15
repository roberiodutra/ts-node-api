import { Request, Response } from 'express';
import questionService from '../services/questionService';

class QuestionController {
  constructor(private service = questionService) {}

  public create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  };

  public read = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await this.service.read();
    res.status(200).json(result);
  };

  public readOne = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const result = await this.service.readOne(id);
    res.status(200).json(result || undefined);
  };

  public update = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const result = await this.service.update(id, req.body);
    res.status(200).json(result);
  };

  public delete = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    await this.service.readOne(id);
    await this.service.delete(id);
    res.status(204).end();
  };
}

export default new QuestionController();
