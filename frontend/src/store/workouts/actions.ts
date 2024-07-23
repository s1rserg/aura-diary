import { createAsyncThunk } from "@reduxjs/toolkit";
import { WorkoutEntry } from "../../common/types/data/workoutEntry.type";
import { name } from "./slice";
import { AsyncThunkConfig } from "../../common/types/types";

const fetchAllWorkouts = createAsyncThunk<
  WorkoutEntry[],
  void,
  AsyncThunkConfig
>(`${name}/fetchAllWorkouts`, async (_payload, { extra }) => {
  const { workoutsService } = extra;
  const workouts = await workoutsService.getAllWorkouts();
  return workouts;
});

export const fetchWorkoutsForPeriod = createAsyncThunk<WorkoutEntry[], { start: Date, end: Date }, AsyncThunkConfig>(
  `${name}/fetchWorkoutsForPeriod`,
  async ({ start, end }, { extra }) => {
    const { workoutsService } = extra;
    const workouts = await workoutsService.getWorkoutsForPeriod(start, end);
    return workouts;
  }
);

const fetchWorkoutsForDate = createAsyncThunk<
  WorkoutEntry[],
  string,
  AsyncThunkConfig
>(`${name}/fetchWorkoutsForDate`, async (date, { extra }) => {
  const { workoutsService } = extra;
  const workouts = await workoutsService.getAllWorkoutsforDate(date);
  return workouts;
});

const fetchWorkoutById = createAsyncThunk<
  WorkoutEntry,
  string,
  AsyncThunkConfig
>(`${name}/fetchWorkoutById`, async (id, { extra }) => {
  const { workoutsService } = extra;
  const workout = await workoutsService.getWorkoutById(id);
  return workout;
});

const createWorkout = createAsyncThunk<
  WorkoutEntry,
  WorkoutEntry,
  AsyncThunkConfig
>(`${name}/createWorkout`, async (workout, { extra }) => {
  const { workoutsService } = extra;
  const newWorkout = await workoutsService.postNewWorkout(workout);
  return newWorkout;
});

const updateWorkout = createAsyncThunk<
  WorkoutEntry,
  WorkoutEntry,
  AsyncThunkConfig
>(`${name}/updateWorkout`, async (workout, { extra }) => {
  const { workoutsService } = extra;
  const updatedWorkout = await workoutsService.editWorkoutById(workout);
  return updatedWorkout;
});

const deleteWorkout = createAsyncThunk<boolean, string, AsyncThunkConfig>(
  `${name}/deleteWorkout`,
  async (id, { extra }) => {
    const { workoutsService } = extra;
    const success = await workoutsService.deleteWorkoutById(id);
    return success;
  }
);

export {
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
