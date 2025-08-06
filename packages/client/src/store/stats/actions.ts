import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, StatsAllPeriodsData } from '~/common/types/types';

const getAllPeriodsStats = createAsyncThunk<
  StatsAllPeriodsData,
  string,
  AsyncThunkConfig
>(
  `${name}/fetchAllPeriodsStats`,
  async (userId, { extra: { statsService } }) => {
    return await statsService.getAllPeriodsStats(userId);
  },
);

export { getAllPeriodsStats };
