import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  usePagination,
  useSearchFilters,
} from '../../hooks/hooks';
import { actions as exerciseActions } from '../../store/exercises/exercises';

const Exercises = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { exercises, status, items } = useAppSelector(
    (state) => state.exercises,
  );

  const { onSearch, search } = useSearchFilters();

  const { page, perPage, nextPage, prevPage, setPerPage } = usePagination(
    items,
    1,
    10,
  );

  useEffect(() => {
    void dispatch(
      exerciseActions.getAll({
        name: search,
        page,
        perPage,
      }),
    );
  }, [search, page, perPage, dispatch]);

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>{JSON.stringify(exercise)}</div>
      ))}
    </div>
  );
};

export { Exercises };
