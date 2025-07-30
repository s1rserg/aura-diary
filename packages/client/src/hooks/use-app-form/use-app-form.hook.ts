import { zodResolver } from '@hookform/resolvers/zod';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormClearErrors,
  UseFormGetValues,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  UseFormSetError,
  type UseFormSetValue,
  type UseFormTrigger,
  type ValidationMode,
} from 'react-hook-form';

import { ZodType } from 'zod';

type ValidationSchema<T extends FieldValues = FieldValues> = ZodType<
  T,
  any,
  any
>;

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
  validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleErrorsClear: UseFormClearErrors<T>;
  handleReset: UseFormReset<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  handleTrigger: UseFormTrigger<T>;
  handleValueSet: UseFormSetValue<T>;
  handleErrorSet: UseFormSetError<T>;
  getValues: UseFormGetValues<T>;
  isDirty: boolean;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = 'onSubmit',
  validationSchema,
}: Parameters<T>): ReturnValue<T> => {
  const parameters: UseFormProps<T> = {
    defaultValues,
    mode,
  };

  if (validationSchema) {
    parameters.resolver = zodResolver(validationSchema);
  }

  const {
    clearErrors,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
    trigger,
    setError,
    getValues,
  } = useForm<T>(parameters);

  return {
    control,
    errors,
    handleErrorsClear: clearErrors,
    handleReset: reset,
    handleSubmit,
    handleTrigger: trigger,
    handleValueSet: setValue,
    handleErrorSet: setError,
    getValues: getValues,
    isDirty,
  };
};

export { useAppForm };
