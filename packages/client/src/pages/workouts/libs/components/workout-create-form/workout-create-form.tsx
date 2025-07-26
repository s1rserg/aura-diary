import { useFieldArray } from 'react-hook-form';
import { Input, Button } from '~/components/components';
import { useAppForm } from '~/hooks/hooks';
import { DEFAULT_WORKOUT_CREATE_PAYLOAD } from './libs/constants/constants';
import {
  createWorkoutSchema,
  ExerciseDto,
  WorkoutCreateRequestDto,
} from '~/common/types/types';
import styles from './styles.module.css';
import { WorkoutExerciseField } from '../workout-exercise-field/workout-exercise-field';
import { useState } from 'react';

type Props = {
  onSubmit: (payload: WorkoutCreateRequestDto) => void;
};

const WorkoutCreateForm = ({ onSubmit }: Props): JSX.Element => {
  const [selectedExercises, setSelectedExercises] = useState<
    Record<number, ExerciseDto>
  >({});

  const { control, errors, handleSubmit, handleErrorSet, handleValueSet } =
    useAppForm<WorkoutCreateRequestDto>({
      defaultValues: DEFAULT_WORKOUT_CREATE_PAYLOAD,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: WorkoutCreateRequestDto) => {
      console.log('formData', formData);

      const schema = createWorkoutSchema(Object.values(selectedExercises));
      const result = schema.safeParse(formData);

      if (!result.success) {
        console.error(result.error.format());
        return;
      }

      for (const key in result.error.flatten().fieldErrors) {
        const message = result.error.flatten().fieldErrors[key]?.[0];
        if (message) {
          handleErrorSet(key as any, { message });
        }
      }

      onSubmit(result.data);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        label="Workout Name"
        name="name"
        control={control}
        errors={errors}
      />
      <Input
        label="Notes"
        name="notes"
        control={control}
        errors={errors}
        rowsCount={3}
      />

      {fields.map((exercise, index) => (
        <WorkoutExerciseField
          key={exercise.id}
          control={control}
          errors={errors}
          index={index}
          setValue={handleValueSet}
          handleSelectedExercises={setSelectedExercises}
          onRemove={() => remove(index)}
        />
      ))}

      <div className={styles['button-wrapper']}>
        <Button
          type="button"
          label="Add Exercise"
          variant="outlined"
          onClick={() =>
            append({
              id: '',
              exerciseId: '',
              name: '',
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
