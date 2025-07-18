import { useWatch } from 'react-hook-form';
import { Select } from '../components'; // Your custom Select component
import { useEffect } from 'react';
import { useAppForm } from '../../hooks/hooks'; // Your custom useAppForm hook
import styles from './styles.module.css';

type FormData = {
  perPage: number; // Keep this, as Select will manage it via RHF
};

type Properties = {
  page: number;
  perPage: number; // This is the current value from the URL (and usePagination)
  nextPage: () => void;
  prevPage: () => void;
  setPerPage: (newPerPage: number) => void; // This function resets page to 1
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
  perPage, // Current perPage from usePagination (URL)
  nextPage,
  prevPage,
  setPerPage, // Function from usePagination that sets perPage in URL and resets page to 1
  setPage,
  totalPages,
}: Properties): JSX.Element => {
  // Initialize useAppForm with the *current* perPage prop.
  // This ensures the Select component displays the correct value from the URL initially.
  const { control, handleReset } = useAppForm<FormData>({
    defaultValues: {
      perPage, // Set default value from the prop
    },
  });

  // Watch for changes in the 'perPage' field managed by React Hook Form
  const { perPage: watchedPerPageFromForm } = useWatch({ control });

  // --- Crucial useEffect update ---
  useEffect(() => {
    // Synchronize the RHF form's 'perPage' field with the 'perPage' prop
    // This handles cases where the URL 'perPage' might change externally (e.g., manual URL edit)
    // or when the component re-mounts/initializes.
    if (watchedPerPageFromForm !== perPage) {
      // If the form's value differs from the prop...
      console.log(
        `Pagination: Resetting form perPage to prop value: ${perPage}`,
      );
      handleReset({ perPage }); // Reset the form field to match the prop
    }
  }, [perPage, handleReset, watchedPerPageFromForm]); // Dependencies include perPage prop and RHF's reset function

  // --- The problematic useEffect, now with a critical condition ---
  useEffect(() => {
    const newPageSize = watchedPerPageFromForm || 10; // Ensure a default
    console.log(
      `Pagination: useEffect for perPage change. watchedPerPageFromForm: ${watchedPerPageFromForm}, current prop perPage: ${perPage}`,
    );

    // ONLY call setPerPage if the value *from the form* is actually different
    // from the *current perPage prop* (which represents the URL state).
    // This prevents redundant calls to setPerPage when the prop hasn't changed
    // but the effect re-runs for other reasons.
    if (newPageSize !== perPage) {
      console.log(
        `Pagination: Calling setPerPage(${newPageSize}) because it differs from prop (${perPage}).`,
      );
      setPerPage(newPageSize);
    } else {
      console.log(
        `Pagination: Skipping setPerPage as watched form value (${newPageSize}) matches prop (${perPage}).`,
      );
    }
  }, [watchedPerPageFromForm, perPage, setPerPage]); // Add perPage prop and setPerPage to dependencies

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <button
          className={styles.button}
          onClick={() => setPage(1)} // Jumps to first page
          disabled={page === 1}
        >
          {'<<'}
        </button>
        <button
          className={styles.button}
          onClick={prevPage} // Calls usePagination's prevPage
          disabled={page === 1}
        >
          {'<'}
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          className={styles.button}
          onClick={nextPage} // Calls usePagination's nextPage
          disabled={page === totalPages}
        >
          {'>'}
        </button>
        <button
          className={styles.button}
          onClick={() => setPage(totalPages)} // Jumps to last page
          disabled={page === totalPages}
        >
          {'>>'}
        </button>
      </div>
      <div className={styles.right}>
        <span className={styles.label}>Items per page</span>
        <div className={styles.selectBox}>
          <Select
            control={control} // Pass control to your Select component
            name="perPage" // Name of the field in your RHF form
            label="Items per page"
            placeholder="Items per page"
            options={PER_PAGE_OPTIONS}
            isClearable={false}
            isSearchable={false}
            isLabelHidden
            // No need for explicit `value` and `onChange` here, `useController` handles it
          />
        </div>
      </div>
    </div>
  );
};
