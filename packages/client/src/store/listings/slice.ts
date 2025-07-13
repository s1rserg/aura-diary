import { createSlice } from '@reduxjs/toolkit';
import { getAll, create, update, deleteById, getById } from './actions';
import { ListingResponseDto, ValueOf } from '~/common/types/types';
import { DataStatus } from '~/common/enums/enums';
import { notifyError } from '~/utils/notification/notification';

export interface ListingsState {
  listing: null | ListingResponseDto;
  listings: ListingResponseDto[];
  status: ValueOf<typeof DataStatus>;
  listingStatus: ValueOf<typeof DataStatus>;
  listingCreateStatus: ValueOf<typeof DataStatus>;
  listingDeleteStatus: ValueOf<typeof DataStatus>;
  listingUpdateStatus: ValueOf<typeof DataStatus>;
  error: { code: string | number | undefined; message: string | undefined };
}

const initialState: ListingsState = {
  listing: null,
  listings: [],
  status: DataStatus.IDLE,
  listingStatus: DataStatus.IDLE,
  listingCreateStatus: DataStatus.IDLE,
  listingDeleteStatus: DataStatus.IDLE,
  listingUpdateStatus: DataStatus.IDLE,
  error: { code: undefined, message: undefined },
};

const { reducer, actions, name } = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.status = DataStatus.SUCCESS;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch listings');
      })
      .addCase(getById.pending, (state) => {
        state.status = DataStatus.PENDING;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.listingStatus = DataStatus.SUCCESS;
      })
      .addCase(getById.rejected, (state, action) => {
        state.listingStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to fetch listing');
      })
      .addCase(create.pending, (state) => {
        state.listingCreateStatus = DataStatus.PENDING;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.listings = [action.payload, ...state.listings];
        state.listingCreateStatus = DataStatus.SUCCESS;
      })
      .addCase(create.rejected, (state, action) => {
        state.listingCreateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to create listing');
      })
      .addCase(update.pending, (state) => {
        state.listingUpdateStatus = DataStatus.PENDING;
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedListing = action.payload;
        state.listings = state.listings.map((listing) =>
          listing._id === updatedListing._id ? updatedListing : listing
        );
        state.listingUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(update.rejected, (state, action) => {
        state.listingUpdateStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to update listing');
      })
      .addCase(deleteById.pending, (state) => {
        state.listingDeleteStatus = DataStatus.PENDING;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        const deletedListingId = action.meta.arg;
        state.listings = state.listings.filter(
          (listing) => listing._id.toString() !== deletedListingId
        );
        state.listingUpdateStatus = DataStatus.SUCCESS;
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.listingDeleteStatus = DataStatus.ERROR;
        state.error = {
          code: action.error.code,
          message: action.error.message,
        };
        notifyError(action.error.message || 'Failed to delete listing');
      });
  },
});

export { reducer, name, actions };
