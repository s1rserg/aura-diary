import { actions as usersActions } from '~/store/users/users.js';
import styles from './styles.module.css';
import { useAppDispatch, useAppForm } from '~/hooks/hooks';
import { useCallback } from 'react';
import { Button, Input } from '~/components/components';
import {
  UserDto,
  UserPatchRequestSchema,
} from '../../../../../common/types/types';

type Properties = {
  user: UserDto;
};

const EditUserForm = ({ user }: Properties): JSX.Element => {
  const { name } = user;
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit, isDirty } = useAppForm<
    Partial<UserDto>
  >({
    defaultValues: {
      name,
    },
    validationSchema: UserPatchRequestSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(async (formData: Partial<UserDto>) => {
        void dispatch(usersActions.update({ data: formData }));
      })(event_);
    },
    [dispatch, handleSubmit, user.id],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['inputs-wrapper']}>
        <Input
          autoComplete="username"
          control={control}
          errors={errors}
          label="My Name"
          name="name"
        />
      </div>
      <div>
        <Button isDisabled={!isDirty} label="Update Profile" type="submit" />
      </div>
    </form>
  );
};

export { EditUserForm };
