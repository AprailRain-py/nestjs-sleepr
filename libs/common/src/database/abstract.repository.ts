import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) { }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  async findOne(
    filter: FilterQuery<TDocument>,
    projection?: Record<string, unknown>,
  ): Promise<TDocument> {
    const document = await this.model.findOne(filter, projection, {
      lean: true,
    });

    if (!document) {
      this.logger.warn(
        `Document not found with filter ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filter: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filter, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(
        `Document not found with filter ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(): Promise<TDocument[]> {
    return this.model.find({}, {}, { lean: true });
  }

  async delete(filter: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filter, { lean: true });

    if (!document) {
      this.logger.warn(
        `Document not found with filter ${JSON.stringify(filter)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }
}
