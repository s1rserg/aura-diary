import { configureStore } from '@reduxjs/toolkit';
import { auth as authService } from '../services/services';
import { workouts as workoutsService } from '../services/services';
import { exercises as exercisesService } from '../services/services';
import { rootReducer } from './root-reducer';
import { listenerMiddleware } from './middleware/401';

const extraArgument = {
  authService,
  workoutsService,
  exercisesService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, extraArgument };
