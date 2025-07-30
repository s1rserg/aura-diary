import { useFieldArray } from 'react-hook-form';
import { Input, Button } from '~/components/components';
import { useAppForm } from '~/hooks/hooks';
import { DEFAULT_WORKOUT_CREATE_PAYLOAD } from './libs/constants/constants';
import {
  CreateWorkoutSchema,
  WorkoutCreateRequestDto,
} from '~/common/types/types';
import styles from './styles.module.css';
import { WorkoutExerciseField } from '../workout-exercise-field/workout-exercise-field';

type Props = {
  onSubmit: (payload: WorkoutCreateRequestDto) => void;
};

const WorkoutCreateForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, errors, handleSubmit, handleValueSet } =
    useAppForm<WorkoutCreateRequestDto>({
      defaultValues: DEFAULT_WORKOUT_CREATE_PAYLOAD,
      validationSchema: CreateWorkoutSchema,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: WorkoutCreateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  const notesErrorMessage = errors.notes?.message;

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        label="Workout Name"
        name="name"
        control={control}
        errors={errors}
      />
      <Input label="Notes" name="notes" control={control} rowsCount={3} />

      {fields.map((exercise, index) => (
        <WorkoutExerciseField
          key={exercise.id}
          control={control}
          errors={errors}
          index={index}
          setValue={handleValueSet}
          onRemove={() => remove(index)}
        />
      ))}

      {notesErrorMessage && (
        <span className={styles['input-error']}>{notesErrorMessage}</span>
      )}

      <div className={styles['button-wrapper']}>
        <Button
          type="button"
          label="Add Exercise"
          variant="outlined"
          onClick={() =>
            append({
              id: '',
              exerciseId: '',
              order: fields.length,
              sets: [],
            })
          }
        />
        <Button type="submit" label="Create Workout" />
      </div>
    </form>
  );
};

export { WorkoutCreateForm };
