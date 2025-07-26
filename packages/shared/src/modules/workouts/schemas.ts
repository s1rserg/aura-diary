/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { ExerciseDto } from '../exercises/types';
import { getApplicableFields } from '../exercises/helpers';

export const createWorkoutSchema = (exercisesMeta: ExerciseDto[]) => {
  return z.object({
    name: z.string().min(1, 'Workout name is required'),
    notes: z.string().nullable(),
    exercises: z
      .array(z.any())
      .min(1, 'At least one exercise is required')
      .superRefine((exercises, ctx) => {
        exercises.forEach((exercise: any, exerciseIndex: number) => {
          const matchingExercise = exercisesMeta.find(
            (e) => e.id === exercise.exerciseId,
          );
          if (!matchingExercise) {
            ctx.addIssue({
              path: [exerciseIndex],
              code: z.ZodIssueCode.custom,
              message: `Exercise metadata not found for exerciseId: ${exercise.exerciseId}`,
            });
            return;
          }

          if (
            !exercise.sets ||
            !Array.isArray(exercise.sets) ||
            exercise.sets.length === 0
          ) {
            ctx.addIssue({
              path: [exerciseIndex, 'sets'],
              code: z.ZodIssueCode.too_small,
              minimum: 1,
              type: 'array',
              inclusive: true,
              message: 'Each exercise must have at least one set',
              input: exercise.sets,
              origin: 'array',
            });
            return;
          }

          const applicableFields = getApplicableFields(matchingExercise);

          exercise.sets.forEach((set: any, setIndex: number) => {
            applicableFields.forEach((field) => {
              const value = set[field];
              if (typeof value !== 'number' || value <= 0) {
                ctx.addIssue({
                  path: [exerciseIndex, 'sets', setIndex, field],
                  code: z.ZodIssueCode.custom,
                  message: `${field} must be a number greater than 0`,
                });
              }
            });
          });
        });
      }),
  });
};
