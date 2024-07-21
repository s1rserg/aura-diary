import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllWorkouts,
  fetchWorkoutsForDate,
  fetchWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "./actions";
import { notifyError } from "../../utils/notification/notification";
import { DataStatus } from "../../common/enums/enums";
import { WorkoutEntry, ValueOf } from "../../common/types/types";

export interface WorkoutsState {
  workouts: WorkoutEntry[];
  selectedWorkout: WorkoutEntry | null;
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | null; message: string | null };
}

const initialState: WorkoutsState = {
  workouts: [],
  selectedWorkout: null,
  status: DataStatus.IDLE,
  error: { code: null, message: null },
};

const { reducer, actions, name } = createSlice({
  name: "workouts",
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
        notifyError(action.error.message || "Failed to fetch workouts.");
      })
      .addCase(fetchWorkoutsForDate.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutsForDate.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchWorkoutsForDate.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(
          action.error.message || "Failed to fetch workouts for date."
        );
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
        notifyError(action.error.message || "Failed to fetch workout.");
      })
      .addCase(createWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to create workout.");
      })
      .addCase(updateWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(
          (workout) => workout.id === action.payload.id
        );
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to update workout.");
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          (workout) => workout.id !== action.meta.arg
        );
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to delete workout.");
      });
  },
});

export { reducer, name, actions };
