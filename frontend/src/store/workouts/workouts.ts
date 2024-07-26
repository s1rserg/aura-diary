import {
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
  fetchUserStats,
} from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
  fetchUserStats
};

export { allActions as actions, reducer };
