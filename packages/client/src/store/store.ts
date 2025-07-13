import { configureStore } from '@reduxjs/toolkit';
import { auth as authService } from '../services/services';
import { listings as listingsService } from '../services/services';
import { images as imagesService } from '../services/services';
import { attributes as attributesService } from '../services/services';
import { rootReducer } from './root-reducer';
import { listenerMiddleware } from './middleware/401';

const extraArgument = {
  authService,
  listingsService,
  imagesService,
  attributesService,
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
