import { z } from 'zod';

export const workoutSchema = z.object({
  name: z.string().min(1, 'Workout name is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  type: z.enum(['strength', 'cardio', 'flexibility']),
});

export type WorkoutInput = z.infer<typeof workoutSchema>;
