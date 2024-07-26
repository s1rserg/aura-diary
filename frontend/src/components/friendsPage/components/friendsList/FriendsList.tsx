import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { approveFriendRequest, denyFriendRequest } from "../../../../store/friends/actions";
import { Friendship } from "../../../../common/types/types";
import "./FriendsList.css";
import { Link } from "react-router-dom";

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.userFriends);
  const friendRequests = useAppSelector((state) => state.friends.friendRequests);

  const handleApprove = (id: string) => {
    dispatch(approveFriendRequest(id));
  };

  const handleDeny = (id: string) => {
    dispatch(denyFriendRequest(id));
  };

  return (
    <div className="friends-list">
      <h2>Incoming Friend Requests</h2>
      <ul className="friends-list__list">
        {friendRequests.map((request: Friendship) => (
          <li className="friends-list__list-item" key={request.id}>
            <span>{request.friend.name}</span>
            <button onClick={() => handleApprove(request.id)}>Approve</button>
            <button onClick={() => handleDeny(request.id)}>Deny</button>
          </li>
        ))}
      </ul>
      <h2>My Friends</h2>
      <ul className="friends-list__list">
        {friends.map((friend: Friendship) => (
          <li className="friends-list__list-item" key={friend.id}>
            <span className="friends-list__list-item__name">{friend.friend ? friend.friend.name : friend.user.name}</span>
            <Link  to={`/stats/${friend.friend ? friend.friendId : friend.userId}`} className="button friends-list__list-item__button">Stats</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
