import {
  CreateWorkoutSchema,
  WorkoutDto,
  WorkoutUpdateRequestDto,
} from '~/common/types/types';
import styles from './styles.module.css';
import { useAppForm } from '~/hooks/hooks';
import { Button, Input } from '~/components/components';
import { WorkoutExerciseField } from '../workout-exercise-field/workout-exercise-field';
import { useFieldArray } from 'react-hook-form';

type Properties = {
  onSubmit: (payload: WorkoutUpdateRequestDto) => void;
  workout: WorkoutDto;
};

const WorkoutUpdateForm = ({ onSubmit, workout }: Properties): JSX.Element => {
  const { control, errors, handleSubmit, handleValueSet } =
    useAppForm<WorkoutUpdateRequestDto>({
      defaultValues: workout,
      validationSchema: CreateWorkoutSchema,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  console.log(fields);

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: WorkoutUpdateRequestDto) => {
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
        <Button type="submit" label="Update Workout" />
      </div>
    </form>
  );
};

export { WorkoutUpdateForm };
