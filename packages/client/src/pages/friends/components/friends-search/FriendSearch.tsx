import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import './FriendSearch.css';
import {
  fetchUsersByName,
  sendFriendRequest,
} from '../../../../store/friends/actions';
import { PotentialFriend, Friendship } from '../../../../common/types/types';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/input/Input';

const FriendSearch: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.friends.friends);
  const friends = useAppSelector((state) => state.friends.userFriends);

  const handleSearch = async () => {
    if (query.trim() !== '') await dispatch(fetchUsersByName(query));
  };

  const handleSendRequest = async (id: string) => {
    await dispatch(sendFriendRequest(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const isFriend = (id: string) => {
    return friends.some(
      (friend: Friendship) => friend.friendId === id || friend.userId === id,
    );
  };

  return (
    <div className="friends__friend-search">
      <div className="friends__friend-search__search-wrapper">
        <Input
          name="search"
          type="search"
          required={true}
          value={query}
          onChange={handleChange}
          placeholder={t('search for users')}
        />
        <button
          className="button friends__friend-search__button"
          onClick={handleSearch}
        >
          {t('search')}
        </button>
      </div>
      <ul className="friends__friend-search__list">
        {query.trim() !== '' &&
          searchResults.map((user: PotentialFriend) => (
            <li key={user.id} className="friends__friend-search__list-item">
              {user.name}
              {isFriend(user.id) ? (
                <span className="friends__friend-search__list-item__friend-span">
                  {t('friend')}
                </span>
              ) : (
                <button
                  className="button"
                  onClick={() => handleSendRequest(user.id)}
                >
                  {t('add friend')}
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
