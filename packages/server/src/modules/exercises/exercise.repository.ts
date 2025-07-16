import { Op, WhereOptions } from 'sequelize';
import { ExerciseQueryOptions } from '../../libs/common/common';
import { BaseRepository } from '../../libs/core/base-repository';
import { Exercise } from './exercise.model';

class ExerciseRepository extends BaseRepository<Exercise> {
  constructor() {
    super(Exercise);
  }

  public buildWhereClause(filters: ExerciseQueryOptions): WhereOptions {
    const where: WhereOptions = {};

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` };
    }

    if (filters.force?.length) {
      where.force = { [Op.in]: filters.force };
    }

    if (filters.level?.length) {
      where.level = { [Op.in]: filters.level };
    }

    if (filters.mechanic?.length) {
      where.mechanic = { [Op.in]: filters.mechanic };
    }

    if (filters.equipment?.length) {
      where.equipment = { [Op.in]: filters.equipment };
    }

    if (filters.category?.length) {
      where.category = { [Op.in]: filters.category };
    }

    if (filters.primaryMuscles?.length) {
      where.primaryMuscles = { [Op.overlap]: filters.primaryMuscles };
    }

    return where;
  }
}

export { ExerciseRepository };
