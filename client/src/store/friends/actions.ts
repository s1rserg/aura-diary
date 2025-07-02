import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig } from '../../common/types/types';
import { PotentialFriend, Friendship } from '../../common/types/types';

const fetchUsersByName = createAsyncThunk<
  PotentialFriend[],
  string,
  AsyncThunkConfig
>(`${name}/fetchUsersByName`, async (name, { extra }) => {
  const { friendsService } = extra;
  const users = await friendsService.getUsersByName(name);
  return users;
});

const fetchFriendRequests = createAsyncThunk<
  Friendship[],
  void,
  AsyncThunkConfig
>(`${name}/fetchFriendRequests`, async (_, { extra }) => {
  const { friendsService } = extra;
  const requests = await friendsService.getFriendRequests();
  return requests;
});

const approveFriendRequest = createAsyncThunk<
  Friendship,
  string,
  AsyncThunkConfig
>(`${name}/approveFriendRequest`, async (id, { extra }) => {
  const { friendsService } = extra;
  const response = await friendsService.approveFriendRequest(id);
  return response;
});

const denyFriendRequest = createAsyncThunk<
  Friendship,
  string,
  AsyncThunkConfig
>(`${name}/denyFriendRequest`, async (id, { extra }) => {
  const { friendsService } = extra;
  const response = await friendsService.denyFriendRequest(id);
  return response;
});

const fetchFriends = createAsyncThunk<Friendship[], void, AsyncThunkConfig>(
  `${name}/fetchFriends`,
  async (_, { extra }) => {
    const { friendsService } = extra;
    const friends = await friendsService.getFriends();
    return friends;
  },
);

const sendFriendRequest = createAsyncThunk<boolean, string, AsyncThunkConfig>(
  `${name}/sendFriendRequest`,
  async (friendId, { extra }) => {
    const { friendsService } = extra;
    const response = await friendsService.sendFriendRequest(friendId);
    return response;
  },
);

export {
  fetchUsersByName,
  fetchFriendRequests,
  approveFriendRequest,
  denyFriendRequest,
  fetchFriends,
  sendFriendRequest,
};
