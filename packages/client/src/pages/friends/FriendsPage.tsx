import React, { useEffect, useState } from 'react';
import './FriendsPage.css';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchFriends, fetchFriendRequests } from '../../store/friends/actions';
import { useTranslation } from 'react-i18next';
import FriendsList from './components/friends-list/FriendsList';
import FriendSearch from './components/friends-search/FriendSearch';

const FriendsPage: React.FC = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'friendsList' | 'friendsSearch'>(
    'friendsList',
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchFriendRequests());
  }, [dispatch]);

  return (
    <div className="friends-page">
      <div className="slider">
        <button
          className={activeTab === 'friendsList' ? 'active button' : 'button'}
          onClick={() => setActiveTab('friendsList')}
        >
          {t('my friends')}
        </button>
        <button
          className={activeTab === 'friendsSearch' ? 'active button' : 'button'}
          onClick={() => setActiveTab('friendsSearch')}
        >
          {t('friends search')}
        </button>
      </div>
      {activeTab === 'friendsList' && <FriendsList />}
      {activeTab === 'friendsSearch' && <FriendSearch />}
    </div>
  );
};

export default FriendsPage;
