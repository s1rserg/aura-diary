import { reducer as authReducer } from './auth/auth';
import { reducer as workoutsReducer } from './workouts/workouts';
import { reducer as exercisesReducer } from './exercises/exercises';

const rootReducer = {
  auth: authReducer,
  workouts: workoutsReducer,
  exercises: exercisesReducer,
};

export { rootReducer };
