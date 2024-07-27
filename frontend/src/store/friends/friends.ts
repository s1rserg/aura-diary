import {
  fetchUsersByName,
  fetchFriendRequests,
  approveFriendRequest,
  denyFriendRequest,
  fetchFriends,
  sendFriendRequest,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  fetchUsersByName,
  fetchFriendRequests,
  approveFriendRequest,
  denyFriendRequest,
  fetchFriends,
  sendFriendRequest,
};

export { allActions as actions, reducer };
