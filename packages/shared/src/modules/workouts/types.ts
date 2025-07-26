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

export type GetAllWorkoutsDto = {
  totalItems: number;
  data: WorkoutDto[];
};

export type WorkoutQueryOptions = {
  name?: string;
  createdAt?: string;
  page?: number;
  perPage?: number;
};

export type WorkoutCreateRequestDto = {
  name: string;
  notes: string | null;
  exercises: WorkoutExerciseDto[];
};

export type WorkoutUpdateRequestDto = {
  name: string;
  notes: string | null;
  exercises: WorkoutExerciseDto[];
};
