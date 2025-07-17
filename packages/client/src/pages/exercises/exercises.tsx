import { useCallback, useEffect } from 'react';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  usePagination,
  useSearchFilters,
} from '../../hooks/hooks';
import { actions as exerciseActions } from '../../store/exercises/exercises';
import { Search } from '../../components/components';
import { Pagination } from '../../components/pagination/pagination';

const Exercises = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { exercises, status, items } = useAppSelector(
    (state) => state.exercises,
  );

  const { onSearch, search } = useSearchFilters();

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch],
  );

  const { page, perPage, nextPage, prevPage, setPerPage, setPage, totalPages } =
    usePagination(items, 1, 10);

  const { control, errors } = useAppForm({
    defaultValues: { search },
    mode: 'onChange',
  });

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
      <Search
        control={control}
        errors={errors}
        isLabelHidden
        label="Listing search"
        name="search"
        onChange={handleSearchChange}
        placeholder="Enter exercise name"
      />
      {exercises.map((exercise) => (
        <div key={exercise.id}>{JSON.stringify(exercise)}</div>
      ))}

      <Pagination
        page={page}
        perPage={perPage}
        nextPage={nextPage}
        prevPage={prevPage}
        setPage={setPage}
        setPerPage={setPerPage}
        totalPages={totalPages}
      ></Pagination>
    </div>
  );
};

export { Exercises };
