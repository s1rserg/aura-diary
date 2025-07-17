import { useWatch } from 'react-hook-form';
import { Select } from '../components';
import { useEffect } from 'react';
import { useAppForm } from '../../hooks/hooks';
import styles from './styles.module.css';

type FormData = {
  perPage: number;
};

type Properties = {
  page: number;
  perPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setPerPage: (newPerPage: number) => void;
  setPage: (newPage: number) => void;
  totalPages: number;
};

const PER_PAGE_OPTIONS = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
];

export const Pagination = ({
  page,
  perPage,
  nextPage,
  prevPage,
  setPerPage,
  setPage,
  totalPages,
}: Properties): JSX.Element => {
  const { control } = useAppForm<FormData>({
    defaultValues: {
      perPage,
    },
  });

  const { perPage: changedPageSize } = useWatch({ control });

  useEffect(() => {
    const newPageSize = changedPageSize || 10;
    setPerPage(newPageSize);
  }, [changedPageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <button
          className={styles.button}
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          {'<<'}
        </button>
        <button
          className={styles.button}
          onClick={prevPage}
          disabled={page === 1}
        >
          {'<'}
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          className={styles.button}
          onClick={nextPage}
          disabled={page === totalPages}
        >
          {'>'}
        </button>
        <button
          className={styles.button}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          {'>>'}
        </button>
      </div>
      <div className={styles.right}>
        <span className={styles.label}>Items per page</span>
        <div className={styles.selectBox}>
          <Select
            control={control}
            name="perPage"
            label="Items per page"
            placeholder="Items per page"
            options={PER_PAGE_OPTIONS}
            isClearable={false}
            isSearchable={false}
            isLabelHidden
          />
        </div>
      </div>
    </div>
  );
};
