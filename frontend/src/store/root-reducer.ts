import { reducer as authReducer } from './auth/auth';
import {reducer as workoutsReducer} from './workouts/workouts'

const rootReducer = {
  auth: authReducer,
  workouts: workoutsReducer
};

export { rootReducer };