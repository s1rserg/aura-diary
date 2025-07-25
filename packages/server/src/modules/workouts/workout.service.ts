import { Workout } from './workout.model';
import { WorkoutExercise } from './workout-exercise.model';
import { WorkoutSet } from './workout-set.model';
import { WorkoutRepository } from './workout.repository';
import {
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
    page = 1,
    perPage = 10,
  ): Promise<{ data: WorkoutDto[]; total: number }> {
    const skip = (page - 1) * perPage;

    const [workouts, total] = await Promise.all([
      Workout.findAll({
        offset: skip,
        limit: perPage,
        order: [['created_at', 'DESC']],
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

  public async create(data: {
    name: string;
    date: string;
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
  }): Promise<WorkoutDto> {
    const workout = await Workout.create(
      {
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
    id: string,
    updates: Partial<Omit<WorkoutDto, 'exercises'>>,
  ): Promise<WorkoutDto | null> {
    const updated = await this.workoutRepository.update(id, {
      name: updates.name,
      notes: updates.notes,
    });

    return updated ? this.getById(id) : null;
  }

  public async delete(id: string): Promise<void> {
    await this.workoutRepository.delete(id);
    return;
  }

  private toDto(workout: Workout): WorkoutDto {
    return {
      id: workout.id,
      name: workout.name,
      notes: workout.notes,
      exercises: (workout.workout_exercises ?? []).map(
        (we): WorkoutExerciseDto => ({
          id: we.id,
          exerciseId: we.exercise?.id ?? we.exercise_id,
          name: we.exercise?.name ?? 'Unknown',
          order: we.order,
          sets: (we.workout_sets ?? []).map(
            (set): WorkoutSetDto => ({
              id: set.id,
              reps: set.reps,
              weight: set.weight,
              duration: set.duration,
              distance: set.distance,
              order: set.order,
            }),
          ),
        }),
      ),
    };
  }
}

export { WorkoutService };
