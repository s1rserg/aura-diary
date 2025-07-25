import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  usePagination,
  useQueryFilter,
} from '../../hooks/hooks';
import { actions as exerciseActions } from '../../store/exercises/exercises';
import { Button, Loader, Modal } from '../../components/components';
import { Pagination } from '../../components/pagination/pagination';
import {
  CategoryType,
  EquipmentType,
  ForceType,
  LevelType,
  MechanicType,
  Muscle,
} from '../../common/types/types';
import { useWatch } from 'react-hook-form';
import styles from './styles.module.css';
import { Filters } from './components/filters/filters';
import { AppPath, DataStatus } from '../../common/enums/enums';
import { ExerciseCard } from './components/exercise-card/exercise-card';
import { configureString } from '../../helpers/helpers';
import { Link } from 'react-router-dom';

const Exercises = (): JSX.Element => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleOpenFilters = () => setIsMobileFiltersOpen(true);
  const handleCloseFilters = () => setIsMobileFiltersOpen(false);

  const dispatch = useAppDispatch();
  const { exercises, status, totalItems } = useAppSelector(
    (state) => state.exercises,
  );

  const searchFilter = useQueryFilter<string>({
    queryParameterName: 'search',
    defaultValue: '',
  });

  const forceFilter = useQueryFilter<string[]>({
    queryParameterName: 'force',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const levelFilter = useQueryFilter<string[]>({
    queryParameterName: 'level',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const primaryMusclesFilter = useQueryFilter<string[]>({
    queryParameterName: 'primaryMuscles',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const mechanicFilter = useQueryFilter<string[]>({
    queryParameterName: 'mechanic',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const equipmentFilter = useQueryFilter<string[]>({
    queryParameterName: 'equipment',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const categoryFilter = useQueryFilter<string[]>({
    queryParameterName: 'category',
    defaultValue: [],
    serialize: (arr) => arr.join(','),
    deserialize: (str) => str.split(',').filter(Boolean),
  });

  const { page, perPage, nextPage, prevPage, setPerPage, setPage, totalPages } =
    usePagination(totalItems, 1, 10);

  const { control, errors } = useAppForm({
    defaultValues: {
      search: searchFilter.value,
      primaryMuscles: primaryMusclesFilter.value,
      force: forceFilter.value,
      level: levelFilter.value,
      mechanic: mechanicFilter.value,
      equipment: equipmentFilter.value,
      category: categoryFilter.value,
    },
    mode: 'onChange',
  });

  const searchValue = useWatch({ control, name: 'search' });
  const force = useWatch({ control, name: 'force' });
  const level = useWatch({ control, name: 'level' });
  const primaryMuscles = useWatch({ control, name: 'primaryMuscles' });
  const mechanic = useWatch({ control, name: 'mechanic' });
  const equipment = useWatch({ control, name: 'equipment' });
  const category = useWatch({ control, name: 'category' });

  useEffect(() => {
    searchFilter.setValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    forceFilter.setValue(force);
  }, [force]);

  useEffect(() => {
    levelFilter.setValue(level);
  }, [level]);

  useEffect(() => {
    primaryMusclesFilter.setValue(primaryMuscles);
  }, [primaryMuscles]);

  useEffect(() => {
    equipmentFilter.setValue(equipment);
  }, [equipment]);

  useEffect(() => {
    mechanicFilter.setValue(mechanic);
  }, [mechanic]);

  useEffect(() => {
    categoryFilter.setValue(category);
  }, [category]);

  useEffect(() => {
    void dispatch(
      exerciseActions.getAll({
        name: searchValue,
        primaryMuscles: primaryMuscles as Muscle[],
        force: force as ForceType[],
        level: level as LevelType[],
        mechanic: mechanic as MechanicType[],
        equipment: equipment as EquipmentType[],
        category: category as CategoryType[],
        page,
        perPage,
      }),
    );
  }, [
    searchValue,
    primaryMuscles,
    force,
    level,
    mechanic,
    equipment,
    category,
    page,
    perPage,
    dispatch,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    searchValue,
    primaryMuscles,
    force,
    level,
    mechanic,
    equipment,
    category,
  ]);

  const hasSearch =
    searchValue ||
    primaryMuscles.length ||
    force.length ||
    level.length ||
    mechanic.length ||
    equipment.length ||
    category.length;

  const itemsPlaceholder =
    totalItems === 0 &&
    (hasSearch
      ? 'There are no exercises that suit applied filters.'
      : 'There are no exercises at the moment.');

  const isLoading = status === DataStatus.PENDING;

  return (
    <div className={styles['exercises']}>
      <div className={styles['filters-layout']}>
        <aside className={styles['filters-sidebar']}>
          <Filters control={control} errors={errors} />
        </aside>
        <div className={styles['filters-mobile-button']}>
          <Button onClick={handleOpenFilters} label="Open Filters"></Button>
        </div>
        {isLoading && <Loader />}
        {!isLoading && totalItems > 0 ? (
          <div className={styles['content-area']}>
            {exercises.map((exercise) => (
              <Link
                to={configureString(AppPath.EXERCISE, {
                  exerciseId: exercise.id,
                })}
                className={styles.exercise}
                key={exercise.id}
              >
                <ExerciseCard exercise={exercise} />
              </Link>
            ))}

            <Pagination
              page={page}
              perPage={perPage}
              nextPage={nextPage}
              prevPage={prevPage}
              setPage={setPage}
              setPerPage={setPerPage}
              totalPages={totalPages}
            />
          </div>
        ) : (
          <p>{itemsPlaceholder}</p>
        )}
      </div>

      <Modal
        isOpened={isMobileFiltersOpen}
        onClose={handleCloseFilters}
        title="Filters"
        isBig={false}
      >
        <Filters control={control} errors={errors} />
      </Modal>
    </div>
  );
};

export { Exercises };
