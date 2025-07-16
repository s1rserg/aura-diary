import { reducer as authReducer } from './auth/auth';
import { reducer as listingsReducer } from './listings/listings';
import { reducer as exercisesReducer } from './exercises/exercises';

const rootReducer = {
  auth: authReducer,
  listings: listingsReducer,
  exercises: exercisesReducer,
};

export { rootReducer };
