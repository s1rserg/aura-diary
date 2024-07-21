import {
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
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
};

export { allActions as actions, reducer };
