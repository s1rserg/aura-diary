import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';
import { ListingResponseDto } from '~/common/types/types';
import { configureString } from '~/helpers/helpers';
import { AppPath } from '~/common/enums/enums';
import { ListingMenu } from '../listing-menu/listing-menu';

type Properties = {
  onDelete: (listing: ListingResponseDto) => void;
  onEdit: (listing: ListingResponseDto) => void;
  listing: ListingResponseDto;
};

const ListingCard = ({
  onDelete,
  onEdit,
  listing,
}: Properties): JSX.Element => {
  const listingRoute = configureString(AppPath.SKILL, {
    id: listing._id,
  });

  const handleEditClick = () => {
    onEdit(listing);
  };

  const handleDeleteClick = () => {
    onDelete(listing);
  };

  return (
    <div className={styles['listing-container']}>
      <NavLink className={styles['listing'] as string} to={listingRoute} />
      <span className={styles['listing-name']}>{listing.name}</span>
      <ListingMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
    </div>
  );
};

export { ListingCard };
