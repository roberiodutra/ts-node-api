import { FilterQuery, PipelineStage, Model } from 'mongoose';
import { IQuestionCount } from '../../domain/cases/questions/interfaces/IQuestionInfo';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: typeof Model) { }

  public async create(obj: T) {
    return this.model.create({ ...obj });
  }

  public async read(page: number, limit: number): Promise<IQuestionCount[]> {
    const countPipeline = [{
      $match: { status: "published" },
    }, {
      $group: { _id: null, count: { $sum: 1 } },
    }, {
      $project: { _id: 0, count: '$count' },
    }];

    const questionsPipeline = [{
      $match: {}
    }, {
      $skip: (page - 1) * limit,
    }, {
      $limit: limit * 1,
    }, {
      $sort: { createdAt: -1 },
    }];

    const pipeline: FilterQuery<PipelineStage[]> = [
      {
        $facet: {
          questions: questionsPipeline,
          total: countPipeline
        }
      }
    ];

    const questions = await this.model.aggregate(pipeline).exec();
    return questions[0];
  }

  public async readOne(_id: string) {
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>) {
    return this.model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string) {
    return this.model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
