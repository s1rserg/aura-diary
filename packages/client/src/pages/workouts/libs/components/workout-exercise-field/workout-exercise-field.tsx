import { useFieldArray, UseFormSetValue, useWatch } from 'react-hook-form';
import { Button, Search, Loader } from '~/components/components';
import { WorkoutSetField } from '../workout-set-field/workout-set-field';
import styles from './styles.module.css';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useSearchFilters,
} from '../../../../../hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { AppPath, DataStatus } from '../../../../../common/enums/enums';
import { ExerciseCard } from '../../../../exercises/components/exercise-card/exercise-card';
import { actions } from '../../../../../store/exercises/exercises';
import { configureString } from '../../../../../helpers/helpers';
import { getApplicableFields } from '../../../../../common/types/types';

type Props = {
  index: number;
  control: any;
  errors: any;
  onRemove: () => void;
  setValue: UseFormSetValue<any>;
};

const WorkoutExerciseField = ({
  index,
  control,
  errors,
  onRemove,
  setValue,
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

  const addSet = () => {
    if (!exercise) {
      return;
    }

    const applicableFields = getApplicableFields(exercise);

    const newSet = {
      id: '',
      order: fields.length,
      ...(applicableFields.includes('reps') && { reps: 0 }),
      ...(applicableFields.includes('weight') && { weight: 0 }),
      ...(applicableFields.includes('duration') && { duration: 0 }),
      ...(applicableFields.includes('distance') && { distance: 0 }),
    };

    append(newSet);
  };

  const handleCardClick = async (event: any) => {
    const card = event.target.closest('[data-id]');
    if (card) {
      const exerciseId = card.getAttribute('data-id');
      setExerciseId(exerciseId);
      await dispatch(actions.getById(exerciseId));
      setValue(`exercises.${index}.exerciseId`, exerciseId);
    }
  };

  useEffect(() => {
    if (exercise && exerciseId && fields.length === 0) {
      addSet();
    }
  }, [exercise]);

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
        <div
          onClick={() => {
            window.open(
              configureString(AppPath.EXERCISE, {
                exerciseId: '' + exerciseId,
              }),
              '_blank',
            );
          }}
        >
          <ExerciseCard
            key={exerciseId}
            exercise={exercise}
            narrow
            data-id={exerciseId}
          />
        </div>
      )}
      {exercise &&
        fields.map((set, setIndex) => (
          <WorkoutSetField
            key={set.id}
            exercise={exercise}
            isOnlySet={fields.length === 1}
            control={control}
            errors={errors}
            exerciseIndex={index}
            setIndex={setIndex}
            onRemove={() => remove(setIndex)}
          />
        ))}

      {!!exerciseId && exercise && (
        <div className={styles['button-group']}>
          <Button
            type="button"
            variant="outlined"
            label="Add Set"
            onClick={addSet}
          />
          <Button
            type="button"
            variant="danger"
            label="Remove Exercise"
            onClick={onRemove}
          />
        </div>
      )}
    </div>
  );
};

export { WorkoutExerciseField };
