import { useFieldArray, useWatch } from 'react-hook-form';
import { Button, Search, Loader } from '~/components/components';
import { WorkoutSetField } from '../workout-set-field/workout-set-field';
import styles from './styles.module.css';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useSearchFilters,
} from '../../../../../hooks/hooks';
import { Fragment, useCallback, useState } from 'react';
import { DataStatus } from '../../../../../common/enums/enums';
import { ExerciseCard } from '../../../../exercises/components/exercise-card/exercise-card';
import { actions } from '../../../../../store/exercises/exercises';

type Props = {
  index: number;
  control: any;
  errors: any;
  onRemove: () => void;
};

const WorkoutExerciseField = ({
  index,
  control,
  errors,
  onRemove,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { exercises, status, totalItems, exercise, exerciseStatus } =
    useAppSelector((state) => state.exercises);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const { onSearch, search } = useSearchFilters();

  const { control: searchControl, errors: searchErrors } = useAppForm({
    defaultValues: { search },
    mode: 'onChange',
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearch(value);
      void dispatch(actions.getAll({ name: value }));
    },
    [onSearch],
  );

  const searchValue = useWatch({ control, name: 'search' });

  const hasSearch = searchValue;

  const itemsPlaceholder =
    totalItems === 0 &&
    (hasSearch
      ? 'There are no exercises that suit applied filters.'
      : 'Please choose an exercise.');

  const areExercisesLoading = status === DataStatus.PENDING;
  const isExerciseLoading = exerciseStatus === DataStatus.PENDING;

  const [exerciseId, setExerciseId] = useState(0);

  const handleCardClick = (event: any) => {
    const card = event.target.closest('[data-id]');
    if (card) {
      const exerciseId = card.getAttribute('data-id');
      setExerciseId(exerciseId);
      void dispatch(actions.getById(exerciseId));
    }
  };

  return (
    <div className={styles['exercise-wrapper']}>
      <div className={styles['exercise-search']}>
        {!exerciseId && (
          <Search
            control={searchControl}
            isLabelHidden={false}
            errors={searchErrors}
            label="Exercise search"
            name="search"
            onChange={handleSearchChange}
            placeholder="Enter exercise name"
          />
        )}
      </div>
      {areExercisesLoading && !exerciseId && <Loader />}
      {!!exerciseId && isExerciseLoading && <Loader />}
      {!areExercisesLoading && totalItems > 0 && !exerciseId ? (
        <div onClick={handleCardClick}>
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              narrow
              data-id={exercise.id}
            />
          ))}
        </div>
      ) : (
        <p>{itemsPlaceholder}</p>
      )}
      {exercise && (
        <ExerciseCard
          key={exerciseId}
          exercise={exercise}
          narrow
          data-id={exerciseId}
        />
      )}
      {fields.map((set, setIndex) => (
        <WorkoutSetField
          key={set.id}
          control={control}
          errors={errors}
          exerciseIndex={index}
          setIndex={setIndex}
          onRemove={() => remove(setIndex)}
        />
      ))}

      <div className={styles['button-group']}>
        <Button
          type="button"
          variant="outlined"
          label="Add Set"
          onClick={() =>
            append({
              id: '',
              reps: 0,
              weight: null,
              duration: null,
              distance: null,
              order: fields.length,
            })
          }
        />
        <Button
          type="button"
          variant="danger"
          label="Remove Exercise"
          onClick={onRemove}
        />
      </div>
    </div>
  );
};

export { WorkoutExerciseField };
