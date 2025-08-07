import { reducer as authReducer } from './auth/auth';
import { reducer as workoutsReducer } from './workouts/workouts';
import { reducer as exercisesReducer } from './exercises/exercises';
import { reducer as statsReducer } from './stats/stats';
import { reducer as usersReducer } from './users/users';

const rootReducer = {
  auth: authReducer,
  workouts: workoutsReducer,
  exercises: exercisesReducer,
  stats: statsReducer,
  users: usersReducer,
};

export { rootReducer };
