import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  Leaderboard,
  UserStatistics,
  WorkoutEntry,
} from '../../common/types/types';

const fetchWorkoutsForPeriod = createAsyncThunk<
  WorkoutEntry[],
  { start: Date; end: Date },
  AsyncThunkConfig
>(`${name}/fetchWorkoutsForPeriod`, async ({ start, end }, { extra }) => {
  const { workoutsService } = extra;
  const workouts = await workoutsService.getWorkoutsForPeriod(start, end);
  return workouts;
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
  },
);

const fetchUserStats = createAsyncThunk<
  UserStatistics,
  string | undefined,
  AsyncThunkConfig
>(`${name}/fetchUserStats`, async (id, { extra }) => {
  const { workoutsService } = extra;
  const workouts = await workoutsService.getUserStats(id);
  return workouts;
});

const fetchLeaderboard = createAsyncThunk<Leaderboard, void, AsyncThunkConfig>(
  `${name}/fetchLeaderboard`,
  async (_payload, { extra }) => {
    const { workoutsService } = extra;
    const workouts = await workoutsService.getLeaderboard();
    return workouts;
  },
);

export {
  fetchWorkoutsForPeriod,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchUserStats,
  fetchLeaderboard,
};
