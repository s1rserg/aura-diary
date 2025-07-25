import {
  Button,
  ConfirmationModal,
  Loader,
  Modal,
  PageLayout,
} from '~/components/components.js';
import { EMPTY_LENGTH } from '~/common/constants/constants.js';

import { actions as listingActions } from '~/store/workouts/workouts.js';

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
  ListingCreateRequestDto,
  ListingResponseDto,
  ListingUpdateRequestDto,
} from '~/common/types/types';
import {
  ListingCard,
  ListingCreateForm,
  ListingSearch,
  ListingUpdateForm,
} from './libs/components/components';

const Listings = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { onSearch, search } = useSearchFilters();

  const [listingToModifyId, setListingToModifyId] = useState<null | string>(
    null,
  );

  const {
    status,
    listing,
    listingCreateStatus,
    listingDeleteStatus,
    listingUpdateStatus,
    listings,
    listingStatus,
  } = useAppSelector(({ listings }) => listings);

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
    if (listingToModifyId) {
      void dispatch(listingActions.getById(String(listingToModifyId)));
    }
  }, [dispatch, listingToModifyId]);

  const hasListings = listings.length !== EMPTY_LENGTH;
  const hasSearch = search.length !== EMPTY_LENGTH;
  const emptyPlaceholderMessage = hasSearch
    ? 'No listings found matching your search criteria. Please try different keywords.'
    : 'No listings created yet. Create the first listing now.';

  const handleLoadListings = useCallback(
    (page: number, pageSize: number) => {
      void dispatch(
        listingActions.getAll({
          name: search,
          page,
          pageSize,
        }),
      );
    },
    [dispatch, search],
  );

  useEffect(() => {
    handleLoadListings(1, 10);
  }, [handleLoadListings]);

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
    if (listingCreateStatus === DataStatus.SUCCESS) {
      handleCreateModalClose();
    }
  }, [handleCreateModalClose, listingCreateStatus]);

  useEffect(() => {
    if (listingUpdateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, listingUpdateStatus]);

  useEffect(() => {
    if (listingDeleteStatus === DataStatus.SUCCESS) {
      handleDeleteConfirmationModalClose();
    }
  }, [handleDeleteConfirmationModalClose, listingDeleteStatus]);

  const handleEditClick = useCallback(
    (listing: ListingResponseDto) => {
      setListingToModifyId(listing._id);
      handleEditModalOpen();
    },
    [handleEditModalOpen],
  );

  const handleDeleteClick = useCallback(
    (listing: ListingResponseDto) => {
      setListingToModifyId(listing._id);
      handleDeleteConfirmationModalOpen();
    },
    [handleDeleteConfirmationModalOpen],
  );

  const handleListingCreateSubmit = useCallback(
    (payload: ListingCreateRequestDto) => {
      void dispatch(listingActions.create(payload));
    },
    [dispatch],
  );

  const handleListingEditSubmit = useCallback(
    (payload: ListingUpdateRequestDto) => {
      if (listingToModifyId) {
        void dispatch(
          listingActions.update({ id: listingToModifyId, data: payload }),
        );
        setListingToModifyId(null);
      }
    },
    [dispatch, listingToModifyId],
  );

  const handleListingDeleteConfirm = useCallback(() => {
    if (listingToModifyId) {
      void dispatch(listingActions.deleteById(listingToModifyId));
    }
  }, [dispatch, listingToModifyId]);

  const isLoading =
    status === DataStatus.IDLE ||
    (status === DataStatus.PENDING && !hasListings);

  const isUpdateFormShown = listing && listingStatus === DataStatus.SUCCESS;

  return (
    <PageLayout>
      <header className={styles['listings-header']}>
        <h1 className={styles['title']}>My Listings</h1>
        <div>
          <Button label="Create New" onClick={handleCreateModalOpen} />
        </div>
      </header>
      <ListingSearch
        control={control}
        errors={errors}
        name="search"
        onChange={handleSearchChange}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['listings-list']}>
          {hasListings ? (
            listings.map((listing) => (
              <ListingCard
                key={listing._id}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
                listing={listing}
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
        title="Create new listing"
      >
        <ListingCreateForm onSubmit={handleListingCreateSubmit} />
      </Modal>
      <Modal
        isOpened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update listing"
      >
        {isUpdateFormShown && (
          <ListingUpdateForm
            onSubmit={handleListingEditSubmit}
            listing={listing}
          />
        )}
      </Modal>
      <ConfirmationModal
        content="The listing will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
        isOpened={isDeleteConfirmationModalOpen}
        onClose={handleDeleteConfirmationModalClose}
        onConfirm={handleListingDeleteConfirm}
      />
    </PageLayout>
  );
};

export { Listings };
