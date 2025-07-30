import { Input, Button } from '~/components/components';
import styles from './styles.module.css';
import {
  ExerciseDto,
  getApplicableFields,
} from '../../../../../common/types/types';

type Props = {
  control: any;
  errors: any;
  exerciseIndex: number;
  setIndex: number;
  onRemove: () => void;
  exercise: ExerciseDto;
  isOnlySet: boolean;
};

const WorkoutSetField = ({
  control,
  errors,
  exerciseIndex,
  setIndex,
  onRemove,
  exercise,
  isOnlySet,
}: Props): JSX.Element => {
  const applicableFields = getApplicableFields(exercise);

  return (
    <div className={styles['set-wrapper']}>
      <h5>Set {setIndex + 1}</h5>

      {applicableFields.includes('reps') && (
        <Input
          label="Reps"
          name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
          type="number"
          control={control}
          errors={errors}
        />
      )}

      {applicableFields.includes('weight') && (
        <Input
          label="Weight (kg)"
          name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
          type="number"
          control={control}
          errors={errors}
        />
      )}

      {applicableFields.includes('duration') && (
        <Input
          label="Duration (sec)"
          name={`exercises.${exerciseIndex}.sets.${setIndex}.duration`}
          type="number"
          control={control}
          errors={errors}
        />
      )}

      {applicableFields.includes('distance') && (
        <Input
          label="Distance (m)"
          name={`exercises.${exerciseIndex}.sets.${setIndex}.distance`}
          type="number"
          control={control}
          errors={errors}
        />
      )}
      <div className={styles['remove-button']}>
        <Button
          type="button"
          label="Remove Set"
          onClick={onRemove}
          isDisabled={isOnlySet}
        />
      </div>
    </div>
  );
};

export { WorkoutSetField };
