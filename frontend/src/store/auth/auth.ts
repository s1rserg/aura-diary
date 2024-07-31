import {
  fetchAuthenticatedUser,
  signIn,
  signUp,
  signOut,
  togglePrivacy,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  fetchAuthenticatedUser,
  signIn,
  signUp,
  signOut,
  togglePrivacy,
};

export { allActions as actions, reducer };
