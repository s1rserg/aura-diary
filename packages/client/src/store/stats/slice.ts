import { createSlice } from '@reduxjs/toolkit';
import { getAllPeriodsStats } from './actions';
import { StatsAllPeriodsData, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface StatsState {
  stats: null | StatsAllPeriodsData;
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: StatsState = {
  stats: null,
  status: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPeriodsStats.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAllPeriodsStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAllPeriodsStats.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch stats');
      });
  },
});

export { reducer, name, actions };
