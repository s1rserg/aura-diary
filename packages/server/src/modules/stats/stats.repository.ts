import { Op } from 'sequelize';
import { Exercise } from '../exercises/exercise.model';
import { WorkoutExercise } from '../workouts/workout-exercise.model';
import { WorkoutSet } from '../workouts/workout-set.model';
import { Workout } from '../workouts/workout.model';

class StatsRepository {
  getWorkoutsWithDetails = async (userId: string, fromDate: Date) => {
    return Workout.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: fromDate,
        },
      },
      include: [
        {
          model: WorkoutExercise,
          include: [
            {
              model: WorkoutSet,
            },
            {
              model: Exercise,
            },
          ],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
  };
}

export { StatsRepository };
