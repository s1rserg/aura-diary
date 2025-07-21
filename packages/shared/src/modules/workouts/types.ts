export type WorkoutSetDto = {
  id: string;
  reps: number;
  weight?: number | null;
  duration?: number | null;
  distance?: number | null;
  order: number;
};

export type WorkoutExerciseDto = {
  id: string;
  exerciseId: string;
  name: string;
  order: number;
  sets: WorkoutSetDto[];
};

export type WorkoutDto = {
  id: string;
  name: string;
  date: string;
  notes: string | null;
  exercises: WorkoutExerciseDto[];
};
