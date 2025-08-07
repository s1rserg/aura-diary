import { useAppSelector, useModal } from '~/hooks/hooks.js';
import { DeleteAccount, EditUserForm } from './libs/components/components.js';
import styles from './styles.module.css';
import { Button, Loader, Modal, PageLayout } from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { formatDate } from '~/utils/date/date.js';
import { FaUser } from 'react-icons/fa';

const Profile = (): JSX.Element => {
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus } = useAppSelector(({ users }) => users);

  const {
    isOpened: isEditModalOpen,
    onClose: handleEditModalClose,
    onOpen: handleEditModalOpen,
  } = useModal();

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, updateStatus]);

  if (!user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <h1 className={styles['title']}>My Profile</h1>
          <Button label="Update Profile" onClick={handleEditModalOpen} />
        </div>
        <div className={styles['profile-info']}>
          <div className={styles['profile-image-wrapper']}>
            <FaUser />
          </div>
          <div className={styles['profile-text']}>
            <h1>{user.name}</h1>
            <div className={styles['profile-text-block']}>
              <h2>Account creation date</h2>
              <h3>{formatDate(new Date(user.createdAt))}</h3>
            </div>
          </div>
        </div>
        <div className={styles['divider']} />
        <DeleteAccount />
      </div>
      <Modal
        isOpened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update Profile"
      >
        <EditUserForm user={user} />
      </Modal>
    </PageLayout>
  );
};

export { Profile };
