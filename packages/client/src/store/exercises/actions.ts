import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  ExerciseDto,
  ExerciseQueryOptions,
} from '~/common/types/types';

const getAll = createAsyncThunk<
  ExerciseDto[],
  ExerciseQueryOptions,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (query, { extra: { exercisesService } }) => {
  return await exercisesService.getAll(query);
});

const getById = createAsyncThunk<ExerciseDto, string, AsyncThunkConfig>(
  `${name}/fetchById`,
  async (id, { extra: { exercisesService } }) => {
    return await exercisesService.getById(id);
  },
);

export { getAll, getById };
