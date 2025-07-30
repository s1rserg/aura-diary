import {
  CategoryType,
  EquipmentType,
  ForceType,
  LevelType,
  MechanicType,
  Muscle,
} from './enums';

export type GetAllExercisesDto = {
  totalItems: number;
  data: ExerciseDto[];
};

export type ExerciseDto = {
  id: string;
  name: string;
  primaryMuscles: Muscle[];
  force: ForceType | null;
  level: LevelType;
  mechanic: MechanicType | null;
  equipment: EquipmentType | null;
  category: CategoryType;
  instructions: string[] | null;
};

export type ExerciseQueryOptions = {
  name?: string;
  primaryMuscles?: Muscle[];
  force?: ForceType[];
  level?: LevelType[];
  mechanic?: MechanicType[];
  equipment?: EquipmentType[];
  category?: CategoryType[];
  page?: number;
  perPage?: number;
};

export type SetField = 'reps' | 'weight' | 'duration' | 'distance';
