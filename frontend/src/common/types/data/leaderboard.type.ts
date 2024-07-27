type Leaderboard = {
  leaders: {
    userId: string;
    name: string;
    count: number;
    rank: number;
  }[];
  currentUser: {
    userId: string;
    name: string;
    count: number;
    rank: number;
  };
};

export { type Leaderboard };
