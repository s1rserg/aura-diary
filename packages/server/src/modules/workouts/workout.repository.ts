import { BaseRepository } from '../../libs/core/base-repository';
import { Workout } from './workout.model';

class WorkoutRepository extends BaseRepository<Workout> {
  constructor() {
    super(Workout);
  }
}

export { WorkoutRepository };
