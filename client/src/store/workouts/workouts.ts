import {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
  fetchUserStats,
  fetchLeaderboard,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
  fetchUserStats,
  fetchLeaderboard,
};

export { allActions as actions, reducer };
