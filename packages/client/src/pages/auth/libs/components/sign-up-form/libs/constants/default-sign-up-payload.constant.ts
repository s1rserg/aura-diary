import { SignUpRequestDto } from '~/common/types/types';

type SignUpFormFields = SignUpRequestDto & {
  confirmPassword: string;
};

const DEFAULT_SIGN_UP_PAYLOAD: SignUpFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD, type SignUpFormFields };
