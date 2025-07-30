import { z } from 'zod';

export const CreateWorkoutSchema = z
  .object({
    name: z.string().min(1, 'Workout name is required'),
    notes: z.string().nullable(),
    exercises: z.array(
      z.object({
        exerciseId: z.string(),
        order: z.number(),
        sets: z.array(
          z.object({
            order: z.number(),
            reps: z.union([z.number(), z.undefined(), z.null()]),
            weight: z.union([z.number(), z.undefined(), z.null()]),
            duration: z.union([z.number(), z.undefined(), z.null()]),
            distance: z.union([z.number(), z.undefined(), z.null()]),
          }),
        ),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    const notesErrors: string[] = [];

    if (!data.exercises || data.exercises.length === 0) {
      notesErrors.push('At least one exercise is required.');
    } else {
      data.exercises.forEach((exercise, i) => {
        const label = `Exercise ${i + 1}`;

        if (!exercise.sets || exercise.sets.length === 0) {
          notesErrors.push(`${label}: At least one set is required.`);
          return;
        }

        exercise.sets.forEach((set, j) => {
          const setLabel = `${label}, Set ${j + 1}`;

          const checkIfPresentAndPositive = (
            value: unknown,
            fieldLabel: string,
          ) => {
            if (value !== undefined && value !== null) {
              if (typeof value !== 'number' || value <= 0) {
                notesErrors.push(
                  `${setLabel}: ${fieldLabel} must be a positive number.`,
                );
              }
            }
          };

          checkIfPresentAndPositive(set.reps, 'Reps');
          checkIfPresentAndPositive(set.weight, 'Weight');
          checkIfPresentAndPositive(set.duration, 'Duration');
          checkIfPresentAndPositive(set.distance, 'Distance');
        });
      });
    }

    if (notesErrors.length > 0) {
      console.warn('Workout validation errors:', notesErrors);

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['notes'],
        message: notesErrors.join(' '),
      });
    }
  });
