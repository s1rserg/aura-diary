import { StatsAllPeriodsData, StatsPeriodData } from '../../libs/common/common';
import { StatsRepository } from './stats.repository';

class StatsService {
  private statsRepository = new StatsRepository();

  getUserStats = async (
    userId: string,
    period: 'week' | 'month' | 'year',
  ): Promise<StatsPeriodData> => {
    const now = new Date();
    let fromDate: Date;

    switch (period) {
      case 'week':
        fromDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7,
        );
        break;
      case 'month':
        fromDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
        );
        break;
      case 'year':
        fromDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
        );
        break;
      default:
        throw new Error('Invalid period');
    }

    const workouts = await this.statsRepository.getWorkoutsWithDetails(
      userId,
      fromDate,
    );

    let totalVolume = 0;
    let totalDuration = 0;
    const workoutsPerDay: Record<string, number> = {};
    const muscleMap: Record<string, number> = {};
    const categoryMap: Record<string, number> = {};

    for (const workout of workouts) {
      const dateKey = workout.createdAt.toISOString().split('T')[0];
      workoutsPerDay[dateKey] = (workoutsPerDay[dateKey] || 0) + 1;

      for (const workoutExercise of workout.workout_exercises || []) {
        const exercise = workoutExercise.exercise;
        if (!exercise) continue;

        // Count primary muscles
        for (const muscle of exercise.primary_muscles || []) {
          muscleMap[muscle] = (muscleMap[muscle] || 0) + 1;
        }

        // Count by category
        const category = exercise.category;
        categoryMap[category] = (categoryMap[category] || 0) + 1;

        for (const set of workoutExercise.workout_sets || []) {
          if (set.reps && set.weight) {
            totalVolume += set.reps * set.weight;
          }

          if (set.duration) {
            totalDuration += set.duration;
          }
        }
      }
    }

    return {
      period,
      totalVolume,
      totalDuration,
      workoutsPerDay,
      muscleMap,
      categoryMap,
    };
  };

  getAllPeriodsStats = async (userId: string): Promise<StatsAllPeriodsData> => {
    const [week, month, year] = await Promise.all([
      this.getUserStats(userId, 'week'),
      this.getUserStats(userId, 'month'),
      this.getUserStats(userId, 'year'),
    ]);

    return { week, month, year };
  };
}

export { StatsService };
