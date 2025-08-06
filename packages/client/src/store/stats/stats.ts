import { getAllPeriodsStats } from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAllPeriodsStats,
};

export { allActions as actions, reducer };
