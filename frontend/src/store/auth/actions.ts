import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './slice';
import {
  ApiAuthPayload,
  AsyncThunkConfig,
  SignInCredentials,
  SignUpCredentials,
} from '../../common/types/types';

const fetchAuthenticatedUser = createAsyncThunk<
  ApiAuthPayload,
  void,
  AsyncThunkConfig
>(`${name}/authenticatedUser`, async (_payload, { extra }) => {
  const { authService } = extra;
  const tasks = await authService.getAuthenticatedUser();

  return tasks;
});

const signIn = createAsyncThunk<
  ApiAuthPayload,
  SignInCredentials,
  AsyncThunkConfig
>(`${name}/signIn`, async (credentials, { extra }) => {
  const { authService } = extra;

  const tasks = await authService.signIn(credentials);

  return tasks;
});

const signUp = createAsyncThunk<
  ApiAuthPayload,
  SignUpCredentials,
  AsyncThunkConfig
>(`${name}/signUp`, async (credentials, { extra }) => {
  const { authService } = extra;

  const tasks = await authService.signUp(credentials);

  return tasks;
});

const signOut = createAction(`${name}/signOut`);

export { fetchAuthenticatedUser, signIn, signUp, signOut };
