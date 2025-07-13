import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCategories,
  getAllSubcategories,
  getAllFilters,
} from './actions';
import { AttributeDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface AttributesState {
  categories: AttributeDto[];
  subcategories: AttributeDto[];
  filters: AttributeDto[];
  categoriesStatus: ValueOf<typeof DataStatus>;
  subcategoriesStatus: ValueOf<typeof DataStatus>;
  filtersStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: AttributesState = {
  categories: [],
  subcategories: [],
  filters: [],
  categoriesStatus: DataStatus.IDLE,
  subcategoriesStatus: DataStatus.IDLE,
  filtersStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.categoriesStatus = DataStatus.PENDING;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = DataStatus.SUCCESS;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch categories');
      });

    builder
      .addCase(getAllSubcategories.pending, (state) => {
        state.subcategoriesStatus = DataStatus.PENDING;
      })
      .addCase(getAllSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
        state.subcategoriesStatus = DataStatus.SUCCESS;
      })
      .addCase(getAllSubcategories.rejected, (state, action) => {
        state.subcategoriesStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch subcategories');
      });

    builder
      .addCase(getAllFilters.pending, (state) => {
        state.filtersStatus = DataStatus.PENDING;
      })
      .addCase(getAllFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersStatus = DataStatus.SUCCESS;
      })
      .addCase(getAllFilters.rejected, (state, action) => {
        state.filtersStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch filters');
      });
  },
});

export { reducer, name, actions };
