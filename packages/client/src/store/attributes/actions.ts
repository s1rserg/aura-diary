import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, AttributeDto } from '~/common/types/types';

const getAllCategories = createAsyncThunk<
  AttributeDto[],
  void,
  AsyncThunkConfig
>(`${name}/fetchAllCategories`, async (_, { extra: { attributesService } }) => {
  return await attributesService.getAllCategories();
});

const getAllSubcategories = createAsyncThunk<
  AttributeDto[],
  void,
  AsyncThunkConfig
>(
  `${name}/fetchAllSubategories`,
  async (_, { extra: { attributesService } }) => {
    return await attributesService.getAllSubcategories();
  }
);

const getAllFilters = createAsyncThunk<AttributeDto[], void, AsyncThunkConfig>(
  `${name}/fetchAllFilters`,
  async (_, { extra: { attributesService } }) => {
    return await attributesService.getAllFilters();
  }
);

export { getAllCategories, getAllSubcategories, getAllFilters };
