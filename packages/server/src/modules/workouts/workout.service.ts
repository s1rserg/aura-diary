import { Workout } from './workout.model';
import { WorkoutExercise } from './workout-exercise.model';
import { WorkoutSet } from './workout-set.model';
import { WorkoutRepository } from './workout.repository';
import {
  UserDto,
  WorkoutDto,
  WorkoutExerciseDto,
  WorkoutSetDto,
} from '../../libs/common/common';
import { Exercise } from '../exercises/exercise.model';

class WorkoutService {
  private workoutRepository = new WorkoutRepository();

  public async getById(id: string): Promise<WorkoutDto | null> {
    const workout = await Workout.findByPk(id, {
      include: [
        {
          model: WorkoutExercise,
          include: [
            {
              model: WorkoutSet,
            },
            {
              model: Exercise,
              attributes: ['id', 'name'],
            },
          ],
          order: [['order', 'ASC']],
        },
      ],
    });

    if (!workout) return null;

    return this.toDto(workout);
  }

  public async getAll(
    userId: UserDto['id'],
    page = 1,
    perPage = 10,
  ): Promise<{ data: WorkoutDto[]; total: number }> {
    const skip = (page - 1) * perPage;

    const [workouts, total] = await Promise.all([
      Workout.findAll({
        where: { userId },
        offset: skip,
        limit: perPage,
        order: [['createdAt', 'DESC']],
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
      }),
      this.workoutRepository.count(),
    ]);

    return {
      total,
      data: workouts.map((w) => this.toDto(w)),
    };
  }

  public async create(
    userId: UserDto['id'],
    data: {
      name: string;
      notes?: string;
      exercises: {
        exerciseId: string;
        order: number;
        sets: {
          reps: number;
          weight?: number | null;
          duration?: number | null;
          distance?: number | null;
          order: number;
        }[];
      }[];
    },
  ): Promise<WorkoutDto> {
    const workout = await Workout.create(
      {
        userId,
        name: data.name,
        notes: data.notes ?? null,
      },
      { returning: true },
    );

    for (const we of data.exercises) {
      const workoutExercise = await WorkoutExercise.create({
        workout_id: workout.id,
        exercise_id: we.exerciseId,
        order: we.order,
      });

      for (const set of we.sets) {
        await WorkoutSet.create({
          workout_exercise_id: workoutExercise.id,
          ...set,
        });
      }
    }

    return this.getById(workout.id) as Promise<WorkoutDto>;
  }

  public async update(
    userId: UserDto['id'],
    id: string,
    updates: Partial<Omit<WorkoutDto, 'id'>>,
  ): Promise<WorkoutDto | null> {
    const existingWorkout = await this.getById(id);
    if (!existingWorkout || existingWorkout.userId !== userId) {
      throw { status: 403, errors: 'Operation is forbidden.' };
    }

    const trx = await Workout.sequelize!.transaction();

    try {
      await this.workoutRepository.update(id, {
        name: updates.name,
        notes: updates.notes,
      });

      if (updates.exercises) {
        const workoutExercises = await WorkoutExercise.findAll({
          where: { workout_id: id },
        });

        for (const we of workoutExercises) {
          await WorkoutSet.destroy({
            where: { workout_exercise_id: we.id },
            transaction: trx,
          });
        }

        await WorkoutExercise.destroy({
          where: { workout_id: id },
          transaction: trx,
        });

        for (const exercise of updates.exercises) {
          const newWorkoutExercise = await WorkoutExercise.create(
            {
              workout_id: id,
              exercise_id: exercise.exerciseId,
              order: exercise.order,
            },
            { transaction: trx },
          );

          for (const set of exercise.sets) {
            await WorkoutSet.create(
              {
                workout_exercise_id: newWorkoutExercise.id,
                ...set,
              },
              { transaction: trx },
            );
          }
        }
      }

      await trx.commit();
      return await this.getById(id);
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  public async delete(userId: UserDto['id'], id: string): Promise<void> {
    const workout = await this.getById(id);
    if (!workout || workout.userId !== userId) {
      throw { status: 403, errors: 'Operation is forbidden.' };
    }

    const trx = await Workout.sequelize!.transaction();

    try {
      const workoutExercises = await WorkoutExercise.findAll({
        where: { workout_id: id },
      });

      for (const we of workoutExercises) {
        await WorkoutSet.destroy({
          where: { workout_exercise_id: we.id },
          transaction: trx,
        });
      }

      await WorkoutExercise.destroy({
        where: { workout_id: id },
        transaction: trx,
      });
      await Workout.destroy({ where: { id }, transaction: trx });

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  private toDto(workout: Workout): WorkoutDto {
    return {
      id: workout.id,
      name: workout.name,
      notes: workout.notes,
      date: workout.createdAt,
      userId: workout.userId,
      exercises: (workout.WorkoutExercises ?? []).map(
        (we): WorkoutExerciseDto => ({
          id: we.id,
          exerciseId: we.exercise?.id ?? we.exercise_id,
          name: we.exercise?.name ?? 'Unknown',
          order: we.order,
          sets: (we.WorkoutSets ?? []).map(
            (set): WorkoutSetDto => ({
              id: set.id,
              reps: set.reps,
              weight: set.weight,
              duration: set.duration,
              distance: set.distance,
              order: set.order,
            }),
          ),
          exercise: we.Exercise ?? undefined,
        }),
      ),
    };
  }
}

export { WorkoutService };
