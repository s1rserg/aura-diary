import { Privacy } from './privacy';

export type UserDto = {
  id: string;
  name: string;
  privacy: Privacy;
  email: string;
  createdAt: Date;
};

export type SignInRequestDto = {
  email: string;
  password: string;
};

export type SignUpRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponseDto = {
  token: string;
  user: UserDto;
};
