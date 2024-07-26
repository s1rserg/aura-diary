import React, { useEffect, useState } from "react";
import FriendsSearch from "./components/friendsSearch/FriendSearch";
import FriendsList from "./components/friendsList/FriendsList";
import "./FriendsPage.css";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchFriends, fetchFriendRequests } from "../../store/friends/actions";

const FriendsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"friendsList" | "friendsSearch">("friendsList");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchFriendRequests());
  }, [dispatch]);

  return (
    <div className="friends-page">
      <div className="slider">
        <button
          className={activeTab === "friendsList" ? "active button" : "button"}
          onClick={() => setActiveTab("friendsList")}
        >
          My Friends
        </button>
        <button
          className={activeTab === "friendsSearch" ? "active button" : "button"}
          onClick={() => setActiveTab("friendsSearch")}
        >
          Friends Search
        </button>
      </div>
      {activeTab === "friendsList" && <FriendsList />}
      {activeTab === "friendsSearch" && <FriendsSearch />}
    </div>
  );
};

export default FriendsPage;
