import { Request, Response } from 'express';
import { IReqQuery } from '../interfaces/IReqQuery';
import questionService from '../services/questionService';

class QuestionController {
  constructor(private service = questionService) { }

  public create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  };

  public filterQuestions = async (req: Request, res: Response) => {
    const { page, limit, status, userId } = req.query as unknown as IReqQuery;
    const result = await this.service
      .filterQuestions(page, limit, status, userId);
    return res.status(200).json(result);
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

export default new QuestionController();
