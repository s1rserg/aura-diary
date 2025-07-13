import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  AsyncThunkConfig,
  GetAllRequestDto,
  ListingCreateRequestDto,
  ListingResponseDto,
  ListingUpdateRequestDto,
} from '~/common/types/types';

const getAll = createAsyncThunk<
  ListingResponseDto[],
  GetAllRequestDto,
  AsyncThunkConfig
>(`${name}/fetchAll`, async (query, { extra: { listingsService } }) => {
  return await listingsService.getAll(query);
});

const getById = createAsyncThunk<ListingResponseDto, string, AsyncThunkConfig>(
  `${name}/fetchById`,
  async (id, { extra: { listingsService } }) => {
    return await listingsService.getById(id);
  }
);

const create = createAsyncThunk<
  ListingResponseDto,
  ListingCreateRequestDto,
  AsyncThunkConfig
>(`${name}/create`, async (data, { extra: { listingsService } }) => {
  return await listingsService.create(data);
});

const update = createAsyncThunk<
  ListingResponseDto,
  { id: string; data: ListingUpdateRequestDto },
  AsyncThunkConfig
>(`${name}/update`, async ({ id, data }, { extra: { listingsService } }) => {
  return await listingsService.update(id, data);
});

const deleteById = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${name}/delete`,
  async (id, { extra: { listingsService } }) => {
    await listingsService.delete(id);
  }
);

export { getAll, getById, create, update, deleteById };
