import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllWorkouts,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  fetchWorkoutsForPeriod,
  fetchUserStats,
} from './actions';
import {
  notifyError,
  notifySuccess,
} from '../../utils/notification/notification';
import { DataStatus } from '../../common/enums/enums';
import {
  WorkoutEntry,
  ValueOf,
  UserStatistics,
} from '../../common/types/types';
import i18n from '../../i18n';

export interface WorkoutsState {
  workouts: WorkoutEntry[];
  selectedWorkout: WorkoutEntry | null;
  status: ValueOf<typeof DataStatus>;
  userStats: UserStatistics | null;
  error: { code: string | number | null; message: string | null };
}

const initialState: WorkoutsState = {
  workouts: [],
  selectedWorkout: null,
  userStats: null,
  status: DataStatus.IDLE,
  error: { code: null, message: null },
};

const { reducer, actions, name } = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkouts.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchAllWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchAllWorkouts.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to fetch workouts.');
      })
      .addCase(fetchWorkoutsForPeriod.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutsForPeriod.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.workouts = action.payload;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutsForPeriod.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to fetch workouts.');
      })
      .addCase(fetchWorkoutById.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutById.fulfilled, (state, action) => {
        state.selectedWorkout = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutById.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to fetch workout.');
      })
      .addCase(createWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('success create workout'));
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to create workout.');
      })
      .addCase(updateWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(
          (workout) => workout.id === action.payload.id,
        );
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('success update workout'));
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to update workout.');
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          (workout) => workout.id !== action.meta.arg,
        );
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('success delete workout'));
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to delete workout.');
      })
      .addCase(fetchUserStats.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.userStats = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || 'Failed to fetch stats.');
      });
  },
});

export { reducer, name, actions };
