import { WorkoutCreateRequestDto } from '~/common/types/types';

const DEFAULT_WORKOUT_CREATE_PAYLOAD: WorkoutCreateRequestDto = {
  name: '',
  notes: '',
  exercises: [],
};

export { DEFAULT_WORKOUT_CREATE_PAYLOAD };
