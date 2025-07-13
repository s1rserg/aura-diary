import { Model, WhereOptions } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected model: typeof Model) {}

  public async create(item: Partial<T['_creationAttributes']>): Promise<T> {
    return this.model.create(item) as Promise<T>;
  }

  public async find(id: number | string): Promise<T | null> {
    return this.model.findByPk(id) as Promise<T | null>;
  }

  public async findAll(
    filter: WhereOptions = {},
    skip = 0,
    limit = 10,
  ): Promise<T[]> {
    return this.model.findAll({
      where: filter,
      offset: skip,
      limit,
      order: [['createdAt', 'DESC']],
    }) as Promise<T[]>;
  }

  public async update(
    id: number | string,
    item: Partial<T['_attributes']>,
  ): Promise<T | null> {
    const record = (await this.model.findByPk(id)) as T;
    if (!record) {
      return null;
    }

    await record.update(item);
    return record;
  }

  public async delete(id: number | string): Promise<T | null> {
    const record = (await this.model.findByPk(id)) as T;
    if (!record) {
      return null;
    }

    await record.destroy();
    return record;
  }
}
