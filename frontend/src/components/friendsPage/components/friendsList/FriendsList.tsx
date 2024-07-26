import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { approveFriendRequest, denyFriendRequest } from "../../../../store/friends/actions";
import { Friendship } from "../../../../common/types/types";
import "./FriendsList.css";
import { Link } from "react-router-dom";
import { DataStatus } from "../../../../common/enums/enums";
import Loader from "../../../loader/Loader";

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector((state) => state.friends.userFriends);
  const friendRequests = useAppSelector((state) => state.friends.friendRequests);
  const status = useAppSelector((state) => state.friends.status);

  const handleApprove = (id: string) => {
    dispatch(approveFriendRequest(id));
  };

  const handleDeny = (id: string) => {
    dispatch(denyFriendRequest(id));
  };
  console.log(friendRequests, friends);

  if(status === DataStatus.PENDING) return <Loader />

  return (
    <div className="friends-list">
      <h2>Incoming Friend Requests</h2>
        <ul className="friends-list__list">
          {friendRequests.map((request: Friendship) => (
            <li className="friends-list__list-item" key={request.id}>
              <span>{request.user.name}</span>
              <button
                className="button friends-list__list-item__button-request"
                onClick={() => handleApprove(request.id)}
              >
                Approve
              </button>
              <button
                className="button friends-list__list-item__button-request"
                onClick={() => handleDeny(request.id)}
              >
                Deny
              </button>
            </li>
          ))}
        </ul>

      <h2>My Friends</h2>
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
                Stats
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default FriendsList;
