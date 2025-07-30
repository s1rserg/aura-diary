import { Op, WhereOptions } from 'sequelize';
import { ExerciseQueryOptions } from '../../libs/common/common';
import { BaseRepository } from '../../libs/core/base-repository';
import { Exercise } from './exercise.model';

class ExerciseRepository extends BaseRepository<Exercise> {
  constructor() {
    super(Exercise);
  }
  private parseFilter(value: unknown): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return [];
  }

  public buildWhereClause(filters: ExerciseQueryOptions): WhereOptions {
    const where: WhereOptions = {};

    if (filters.name) {
      where.name = { [Op.iLike]: `%${filters.name}%` };
    }

    const force = this.parseFilter(filters.force);
    if (force.length > 0) {
      where.force = { [Op.in]: force };
    }

    const level = this.parseFilter(filters.level);
    if (level.length > 0) {
      where.level = { [Op.in]: level };
    }

    const mechanic = this.parseFilter(filters.mechanic);
    if (mechanic.length > 0) {
      where.mechanic = { [Op.in]: mechanic };
    }

    const equipment = this.parseFilter(filters.equipment);
    if (equipment.length > 0) {
      where.equipment = { [Op.in]: equipment };
    }

    const category = this.parseFilter(filters.category);
    if (category.length > 0) {
      where.category = { [Op.in]: category };
    }

    const primaryMuscles = this.parseFilter(filters.primaryMuscles);
    if (primaryMuscles.length > 0) {
      where.primary_muscles = { [Op.overlap]: primaryMuscles };
    }

    return where;
  }
}

export { ExerciseRepository };
