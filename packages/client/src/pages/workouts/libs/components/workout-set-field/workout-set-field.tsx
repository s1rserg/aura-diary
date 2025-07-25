import { Input, Button } from '~/components/components';
import styles from './styles.module.css';

type Props = {
  control: any;
  errors: any;
  exerciseIndex: number;
  setIndex: number;
  onRemove: () => void;
};

const WorkoutSetField = ({
  control,
  errors,
  exerciseIndex,
  setIndex,
  onRemove,
}: Props): JSX.Element => {
  return (
    <div className={styles['set-wrapper']}>
      <h5>Set {setIndex + 1}</h5>
      <Input
        label="Reps"
        name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
        type="number"
        control={control}
        errors={errors}
      />
      <Input
        label="Weight (kg)"
        name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        type="number"
        control={control}
        errors={errors}
      />
      <Input
        label="Duration (sec)"
        name={`exercises.${exerciseIndex}.sets.${setIndex}.duration`}
        type="number"
        control={control}
        errors={errors}
      />
      <Input
        label="Distance (m)"
        name={`exercises.${exerciseIndex}.sets.${setIndex}.distance`}
        type="number"
        control={control}
        errors={errors}
      />
      <Button type="button" label="Remove Set" onClick={onRemove} />
    </div>
  );
};

export { WorkoutSetField };
