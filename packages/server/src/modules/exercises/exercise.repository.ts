import { BaseRepository } from '../../libs/core/base-repository';
import { Exercise } from './exercise.model';

class ExerciseRepository extends BaseRepository<Exercise> {
  constructor() {
    super(Exercise);
  }
}

export { ExerciseRepository };
