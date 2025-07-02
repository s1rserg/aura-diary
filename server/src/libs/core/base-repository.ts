import { Model, FindOptions, WhereOptions } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  constructor(protected model: { new (): T } & typeof Model) {}

  public async create(item: Partial<T['_creationAttributes']>): Promise<T> {
    return this.model.create(item);
  }

  public async find(id: number | string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  public async findAll(
    filter: WhereOptions = {},
    skip = 0,
    limit = 10
  ): Promise<T[]> {
    const options: FindOptions = {
      where: filter,
      offset: skip,
      limit,
      order: [['createdAt', 'DESC']],
    };

    return this.model.findAll(options);
  }

  public async update(id: number | string, item: Partial<T['_attributes']>): Promise<T | null> {
    const record = await this.model.findByPk(id);
    if (!record) return null;

    await record.update(item);
    return record;
  }

  public async delete(id: number | string): Promise<T | null> {
    const record = await this.model.findByPk(id);
    if (!record) return null;

    await record.destroy();
    return record;
  }
}
