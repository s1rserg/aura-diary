import { createSlice } from '@reduxjs/toolkit';
import { getAll, create, update, deleteById, getById } from './actions';
import { ValueOf, WorkoutDto } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface WorkoutsState {
  workout: null | WorkoutDto;
  workouts: WorkoutDto[];
  totalItems: number;
  status: ValueOf<typeof DataStatus>;
  workoutStatus: ValueOf<typeof DataStatus>;
  workoutCreateStatus: ValueOf<typeof DataStatus>;
  workoutDeleteStatus: ValueOf<typeof DataStatus>;
  workoutUpdateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: WorkoutsState = {
  workout: null,
  workouts: [],
  totalItems: 0,
  status: DataStatus.IDLE,
  workoutStatus: DataStatus.IDLE,
  workoutCreateStatus: DataStatus.IDLE,
  workoutDeleteStatus: DataStatus.IDLE,
  workoutUpdateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.workouts = action.payload.data;
        state.totalItems = 0;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch workouts');
      })
      .addCase(getById.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.workout = action.payload;
        state.workoutStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.workoutStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch workout');
      })
      .addCase(create.pending, (state) => {
        state.workoutCreateStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.workouts = [action.payload, ...state.workouts];
        state.workoutCreateStatus = DataStatus.SUCCESS;
      })
      .addCase(create.rejected, (state, action) => {
        state.workoutCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create workout');
      })
      .addCase(update.pending, (state) => {
        state.workoutUpdateStatus = DataStatus.PENDING;
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedWorkout = action.payload;
        state.workouts = state.workouts.map((workout) =>
          workout.id === updatedWorkout.id ? updatedWorkout : workout,
        );
        state.workoutUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(update.rejected, (state, action) => {
        state.workoutUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update workout');
      })
      .addCase(deleteById.pending, (state) => {
        state.workoutDeleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        const deletedWorkoutId = action.meta.arg;
        state.workouts = state.workouts.filter(
          (workout) => workout.id.toString() !== deletedWorkoutId,
        );
        state.workoutUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.workoutDeleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete workout');
      });
  },
});

export { reducer, name, actions };
