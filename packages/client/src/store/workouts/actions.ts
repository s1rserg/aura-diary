import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  GetAllWorkoutsDto,
  WorkoutCreateRequestDto,
  WorkoutDto,
  WorkoutQueryOptions,
  WorkoutUpdateRequestDto,
} from '~/common/types/types';

const getAll = createAsyncThunk<
  GetAllWorkoutsDto,
  WorkoutQueryOptions,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (query, { extra: { workoutsService } }) => {
  return await workoutsService.getAll(query);
});

const getById = createAsyncThunk<WorkoutDto, string, AsyncThunkConfig>(
  `${name}/fetchById`,
  async (id, { extra: { workoutsService } }) => {
    return await workoutsService.getById(id);
  },
);

const create = createAsyncThunk<
  WorkoutDto,
  WorkoutCreateRequestDto,
  AsyncThunkConfig
>(`${name}/create`, async (data, { extra: { workoutsService } }) => {
  return await workoutsService.create(data);
});

const update = createAsyncThunk<
  WorkoutDto,
  { id: string; data: WorkoutUpdateRequestDto },
  AsyncThunkConfig
>(`${name}/update`, async ({ id, data }, { extra: { workoutsService } }) => {
  return await workoutsService.update(id, data);
});

const deleteById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${name}/delete`,
  async (id, { extra: { workoutsService } }) => {
    await workoutsService.delete(id);
  },
);

export { getAll, getById, create, update, deleteById };
