import { getAll, getById } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAll,
  getById,
};

export { allActions as actions, reducer };
