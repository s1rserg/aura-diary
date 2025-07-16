import { Exercise } from './exercise.model';
import { ExerciseRepository } from './exercise.repository';
import {
  ExerciseDto,
  ExerciseQueryOptions,
  GetAllExercisesDto,
} from '../../libs/common/common';

class ExerciseService {
  private exerciseRepository = new ExerciseRepository();

  public async getById(id: string): Promise<ExerciseDto | null> {
    const exercise = await this.exerciseRepository.findById(id);
    return exercise ? this.selectFields(exercise) : null;
  }

  public async getAll(
    filter: ExerciseQueryOptions,
    page = 1,
    perPage = 10,
  ): Promise<GetAllExercisesDto> {
    const skip = (page - 1) * perPage;
    const where = this.exerciseRepository.buildWhereClause(filter);

    const [exercises, items] = await Promise.all([
      this.exerciseRepository.findAll(where, skip, perPage),
      this.exerciseRepository.count(where),
    ]);

    return {
      items,
      data: exercises.map((exercise) => this.selectFields(exercise)),
    };
  }

  private selectFields(exercise: Exercise): ExerciseDto {
    return {
      id: exercise.id,
      name: exercise.name,
      primaryMuscles: exercise.primary_muscles,
      force: exercise.force,
      level: exercise.level,
      mechanic: exercise.mechanic,
      equipment: exercise.equipment,
      category: exercise.category,
      instructions: exercise.instructions,
    };
  }
}

export { ExerciseService };
