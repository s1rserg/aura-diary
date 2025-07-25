import {
  Button,
  ConfirmationModal,
  Loader,
  Modal,
  PageLayout,
} from '~/components/components.js';
import { EMPTY_LENGTH } from '~/common/constants/constants.js';

import { actions as workoutActions } from '~/store/workouts/workouts.js';

import styles from './styles.module.css';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useModal,
  useSearchFilters,
} from '~/hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { DataStatus } from '~/common/enums/enums';
import {
  WorkoutCreateRequestDto,
  WorkoutDto,
  WorkoutUpdateRequestDto,
} from '~/common/types/types';
import {
  WorkoutCard,
  WorkoutCreateForm,
  WorkoutSearch,
} from './libs/components/components';

const Workouts = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { onSearch, search } = useSearchFilters();

  const [workoutToModifyId, setWorkoutToModifyId] = useState<null | string>(
    null,
  );

  const {
    status,
    workout,
    workoutCreateStatus,
    workoutDeleteStatus,
    workoutUpdateStatus,
    workouts,
    workoutStatus,
  } = useAppSelector(({ workouts }) => workouts);

  const { control, errors } = useAppForm({
    defaultValues: { search },
    mode: 'onChange',
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch],
  );

  useEffect(() => {
    if (workoutToModifyId) {
      void dispatch(workoutActions.getById(String(workoutToModifyId)));
    }
  }, [dispatch, workoutToModifyId]);

  const hasWorkouts = workouts.length !== EMPTY_LENGTH;
  const hasSearch = search.length !== EMPTY_LENGTH;
  const emptyPlaceholderMessage = hasSearch
    ? 'No workouts found matching your search criteria. Please try different keywords.'
    : 'No workouts created yet. Create the first workout now.';

  const handleLoadWorkouts = useCallback(
    (page: number, perPage: number) => {
      void dispatch(
        workoutActions.getAll({
          name: search,
          page,
          perPage,
        }),
      );
    },
    [dispatch, search],
  );

  useEffect(() => {
    handleLoadWorkouts(1, 10);
  }, [handleLoadWorkouts]);

  const {
    isOpened: isCreateModalOpen,
    onClose: handleCreateModalClose,
    onOpen: handleCreateModalOpen,
  } = useModal();
  const {
    isOpened: isEditModalOpen,
    onClose: handleEditModalClose,
    onOpen: handleEditModalOpen,
  } = useModal();
  const {
    isOpened: isDeleteConfirmationModalOpen,
    onClose: handleDeleteConfirmationModalClose,
    onOpen: handleDeleteConfirmationModalOpen,
  } = useModal();

  useEffect(() => {
    if (workoutCreateStatus === DataStatus.SUCCESS) {
      handleCreateModalClose();
    }
  }, [handleCreateModalClose, workoutCreateStatus]);

  useEffect(() => {
    if (workoutUpdateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, workoutUpdateStatus]);

  useEffect(() => {
    if (workoutDeleteStatus === DataStatus.SUCCESS) {
      handleDeleteConfirmationModalClose();
    }
  }, [handleDeleteConfirmationModalClose, workoutDeleteStatus]);

  const handleEditClick = useCallback(
    (workout: WorkoutDto) => {
      setWorkoutToModifyId(workout.id);
      handleEditModalOpen();
    },
    [handleEditModalOpen],
  );

  const handleDeleteClick = useCallback(
    (workout: WorkoutDto) => {
      setWorkoutToModifyId(workout.id);
      handleDeleteConfirmationModalOpen();
    },
    [handleDeleteConfirmationModalOpen],
  );

  const handleWorkoutCreateSubmit = useCallback(
    (payload: WorkoutCreateRequestDto) => {
      void dispatch(workoutActions.create(payload));
    },
    [dispatch],
  );

  const handleWorkoutEditSubmit = useCallback(
    (payload: WorkoutUpdateRequestDto) => {
      if (workoutToModifyId) {
        void dispatch(
          workoutActions.update({ id: workoutToModifyId, data: payload }),
        );
        setWorkoutToModifyId(null);
      }
    },
    [dispatch, workoutToModifyId],
  );

  const handleWorkoutDeleteConfirm = useCallback(() => {
    if (workoutToModifyId) {
      void dispatch(workoutActions.deleteById(workoutToModifyId));
    }
  }, [dispatch, workoutToModifyId]);

  const isLoading =
    status === DataStatus.IDLE ||
    (status === DataStatus.PENDING && !hasWorkouts);

  const isUpdateFormShown = workout && workoutStatus === DataStatus.SUCCESS;

  return (
    <PageLayout>
      <header className={styles['workouts-header']}>
        <h1 className={styles['title']}>My Workouts</h1>
        <div>
          <Button label="Create New" onClick={handleCreateModalOpen} />
        </div>
      </header>
      <WorkoutSearch
        control={control}
        errors={errors}
        name="search"
        onChange={handleSearchChange}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['workouts-list']}>
          {hasWorkouts ? (
            workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
                workout={workout}
              />
            ))
          ) : (
            <p className={styles['empty-placeholder']}>
              {emptyPlaceholderMessage}
            </p>
          )}
        </div>
      )}
      <Modal
        isOpened={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Create new workout"
      >
        <WorkoutCreateForm onSubmit={handleWorkoutCreateSubmit} />
      </Modal>
      <Modal
        isOpened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update workout"
      >
        {isUpdateFormShown &&
          123
          // <WorkoutUpdateForm
          //   onSubmit={handleWorkoutEditSubmit}
          //   workout={workout}
          // />
        }
      </Modal>
      <ConfirmationModal
        content="The workout will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
        isOpened={isDeleteConfirmationModalOpen}
        onClose={handleDeleteConfirmationModalClose}
        onConfirm={handleWorkoutDeleteConfirm}
      />
    </PageLayout>
  );
};

export { Workouts };
