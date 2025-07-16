import {
  Model,
  WhereOptions,
  Transaction,
  ModelStatic,
  InferAttributes,
} from 'sequelize';
import { MakeNullishOptional } from 'sequelize/lib/utils';

export abstract class BaseRepository<T extends Model> {
  protected readonly model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async create(
    item: MakeNullishOptional<T['_creationAttributes']>,
    options?: { transaction?: Transaction },
  ): Promise<T> {
    return this.model.create(item, options);
  }

  public async findById(
    id: number | string,
    options?: { transaction?: Transaction },
  ): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  public async findAll(
    filter: WhereOptions<InferAttributes<T>> = {},
    skip = 0,
    limit = 10,
    options: { transaction?: Transaction } = {},
  ): Promise<T[]> {
    return this.model.findAll({
      where: filter,
      offset: skip,
      limit,
      ...options,
    });
  }

  public async update(
    id: number | string,
    item: Partial<InferAttributes<T>>,
    options?: { transaction?: Transaction },
  ): Promise<T | null> {
    const record = await this.model.findByPk(id, { ...options });
    if (!record) {
      return null;
    }
    await record.update(item, options);
    return record;
  }

  public async delete(
    id: number | string,
    options?: { transaction?: Transaction },
  ): Promise<T | null> {
    const record = await this.model.findByPk(id, { ...options });
    if (!record) {
      return null;
    }
    await record.destroy(options);
    return record;
  }
}
