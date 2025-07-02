type Friendship = {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  friend: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
};

type PotentialFriend = {
  id: string;
  name: string;
};

export { type Friendship, type PotentialFriend };
