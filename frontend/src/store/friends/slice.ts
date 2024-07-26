import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersByName,
  fetchFriendRequests,
  approveFriendRequest,
  denyFriendRequest,
  fetchFriends,
  sendFriendRequest
} from "./actions";
import { notifyError, notifySuccess } from "../../utils/notification/notification";
import { DataStatus } from "../../common/enums/enums";
import { PotentialFriend, Friendship, ValueOf } from "../../common/types/types";
import i18n from "../../i18n";

export interface FriendsState {
  friends: PotentialFriend[];
  friendRequests: Friendship[];
  userFriends: Friendship[];
  status: ValueOf<typeof DataStatus>;
  error: { code: string | number | null; message: string | null };
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: [],
  userFriends: [],
  status: DataStatus.IDLE,
  error: { code: null, message: null },
};

const { reducer, actions, name } = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByName.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchUsersByName.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchUsersByName.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to fetch users.");
      })
      .addCase(fetchFriendRequests.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchFriendRequests.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to fetch friend requests.");
      })
      .addCase(approveFriendRequest.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(approveFriendRequest.fulfilled, (state, action) => {
        state.friendRequests = state.friendRequests.filter(request => request.id !== action.payload.id);
        state.userFriends.push(action.payload);
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('approve friend request'));
      })
      .addCase(approveFriendRequest.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to approve friend request.");
      })
      .addCase(denyFriendRequest.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(denyFriendRequest.fulfilled, (state, action) => {
        state.friendRequests = state.friendRequests.filter(request => request.id !== action.payload.id);
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('deny friend request'));
      })
      .addCase(denyFriendRequest.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to deny friend request.");
      })
      .addCase(fetchFriends.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.userFriends = action.payload;
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to fetch friends.");
      })
      .addCase(sendFriendRequest.pending, (state) => {
        state.status = DataStatus.PENDING;
        state.error = { code: null, message: null };
      })
      .addCase(sendFriendRequest.fulfilled, (state) => {
        state.status = DataStatus.SUCCESS;
        state.error = { code: null, message: null };
        notifySuccess(i18n.t('send friend request'));
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.status = DataStatus.ERROR;
        state.error = {
          code: action.error.code || null,
          message: action.error.message || null,
        };
        notifyError(action.error.message || "Failed to send friend request.");
      });
  },
});

export { reducer, name, actions };
