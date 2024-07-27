import { reducer as authReducer } from './auth/auth';
import { reducer as workoutsReducer } from './workouts/workouts';
import { reducer as friendsReducer } from './friends/friends';

const rootReducer = {
  auth: authReducer,
  workouts: workoutsReducer,
  friends: friendsReducer,
};

export { rootReducer };
