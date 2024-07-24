import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import Input from "../../../input/Input";
import "./FriendSearch.css";
import { fetchUsersByName, sendFriendRequest } from "../../../../store/friends/actions";
import { PotentialFriend, Friendship } from "../../../../common/types/types";

const FriendSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.friends.friends);
  const friends = useAppSelector((state) => state.friends.userFriends);

  const handleSearch = async () => {
    if (query.trim() !== "") await dispatch(fetchUsersByName(query));
  };

  const handleSendRequest = async (id: string) => {
    await dispatch(sendFriendRequest(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const isFriend = (id: string) => {
    return friends.some((friend: Friendship) => friend.friendId === id);
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
          placeholder="Search for users"
        />
        <button
          className="button friends__friend-search__button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="friends__friend-search__list">
        {query.trim() !== "" &&
          searchResults.map((user: PotentialFriend) => (
            <li key={user.id} className="friends__friend-search__list-item">
              {user.name}
              {isFriend(user.id) ? (
                <span className="friends__friend-search__list-item__friend-span">Friend</span>
              ) : (
                <button
                  className="button"
                  onClick={() => handleSendRequest(user.id)}
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
