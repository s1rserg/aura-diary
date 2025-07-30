import { useSearchParams } from 'react-router-dom';

export function usePagination(
  totalItems: number,
  defaultPage = 1,
  defaultPerPage = 10,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '', 10) || defaultPage;
  const perPage =
    parseInt(searchParams.get('perPage') || '', 10) || defaultPerPage;

  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const currentPage = page > totalPages ? totalPages : page;

  const setPage = (newPage: number) => {
    const clampedPage = Math.min(Math.max(newPage, 1), totalPages);
    searchParams.set('page', String(clampedPage));
    setSearchParams(searchParams);
  };

  const setPerPage = (newPerPage: number) => {
    searchParams.set('perPage', String(newPerPage));
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  const reset = () => {
    searchParams.set('page', String(defaultPage));
    searchParams.set('perPage', String(defaultPerPage));
    setSearchParams(searchParams);
  };

  return {
    page: currentPage,
    perPage,
    totalPages,
    setPage,
    setPerPage,
    nextPage,
    prevPage,
    reset,
  };
}
