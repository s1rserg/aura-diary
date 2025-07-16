import { createSlice } from '@reduxjs/toolkit';
import { getAll, getById } from './actions';
import { ExerciseDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface ListingsState {
  exercise: null | ExerciseDto;
  exercises: ExerciseDto[];
  status: ValueOf<typeof DataStatus>;
  exerciseStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: ListingsState = {
  exercise: null,
  exercises: [],
  status: DataStatus.IDLE,
  exerciseStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.exercises = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch exercises');
      })
      .addCase(getById.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.exercise = action.payload;
        state.exerciseStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.exerciseStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch exercise');
      });
  },
});

export { reducer, name, actions };
