import { reducer as authReducer } from './auth/auth';

const rootReducer = {
  auth: authReducer
};

export { rootReducer };