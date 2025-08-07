import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import { AsyncThunkConfig, UserDto } from '~/common/types/types';
import { actions as authActions } from '~/store/auth/auth';

const update = createAsyncThunk<
  void,
  { id: string; data: Partial<UserDto> },
  AsyncThunkConfig
>(
  `${name}/update`,
  async ({ id, data }, { dispatch, extra: { usersService } }) => {
    await usersService.update(id, data);
    setTimeout(async () => {
      await dispatch(authActions.fetchAuthenticatedUser());
    }, 1000);
  },
);

const deleteCurrentUser = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${name}/delete-current-user`,
  async (_, { dispatch, extra: { usersService } }) => {
    await usersService.deleteCurrentUser();
    await dispatch(authActions.fetchAuthenticatedUser());
    void dispatch(authActions.signOut());
  },
);

export { update, deleteCurrentUser };
