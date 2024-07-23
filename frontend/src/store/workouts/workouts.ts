import {
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
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
  fetchWorkoutsForPeriod
};

export { allActions as actions, reducer };
