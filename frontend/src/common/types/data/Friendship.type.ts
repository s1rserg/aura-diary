type Friendship = {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  friend: {
    name: string;
  }
};

export {type Friendship}
