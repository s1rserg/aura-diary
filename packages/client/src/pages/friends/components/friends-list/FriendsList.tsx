import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  approveFriendRequest,
  denyFriendRequest,
} from '../../../../store/friends/actions';
import { Friendship } from '../../../../common/types/types';
import './FriendsList.css';
import { Link } from 'react-router-dom';
import { DataStatus } from '../../../../common/enums/enums';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../components/loader/Loader';

const FriendsList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.userFriends);
  const friendRequests = useAppSelector(
    (state) => state.friends.friendRequests,
  );
  const status = useAppSelector((state) => state.friends.status);

  const handleApprove = (id: string) => {
    dispatch(approveFriendRequest(id));
  };

  const handleDeny = (id: string) => {
    dispatch(denyFriendRequest(id));
  };

  if (status === DataStatus.PENDING) return <Loader />;

  return (
    <div className="friends-list">
      <h2>{t('incoming friend requests')}</h2>
      <ul className="friends-list__list">
        {friendRequests.map((request: Friendship) => (
          <li className="friends-list__list-item" key={request.id}>
            <span>{request.user.name}</span>
            <button
              className="button friends-list__list-item__button-request"
              onClick={() => handleApprove(request.id)}
            >
              {t('approve')}
            </button>
            <button
              className="button friends-list__list-item__button-request"
              onClick={() => handleDeny(request.id)}
            >
              {t('deny')}
            </button>
          </li>
        ))}
      </ul>

      <h2>{t('my friends')}</h2>
      <ul className="friends-list__list">
        {friends.map((friend: Friendship) => (
          <li className="friends-list__list-item" key={friend.id}>
            <span className="friends-list__list-item__name">
              {friend.friend ? friend.friend.name : friend.user.name}
            </span>
            <Link
              to={`/stats/${friend.friend ? friend.friendId : friend.userId}`}
              className="button friends-list__list-item__button"
            >
              {t('stats')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
