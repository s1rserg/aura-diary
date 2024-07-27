import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './Leaderboard.css';
import Loader from '../loader/Loader';
import { DataStatus } from '../../common/enums/enums';
import { fetchLeaderboard } from '../../store/workouts/actions';

const Leaderboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { leaderboard, status } = useAppSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  if (status === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <h2>Monthly workouts count</h2>
      <ul>
        {leaderboard &&
          leaderboard.leaders.map((user, index) => (
            <li
              key={user.userId}
              className={`leaderboard-item ${user.userId !== leaderboard.currentUser.userId ? '' : 'current-user'}`}
            >
              {index + 1}. {user.name} - {user.count} workouts
            </li>
          ))}
        {leaderboard && leaderboard.currentUser.rank > 10 && (
          <li className="leaderboard-item current-user">
            {leaderboard.currentUser.rank}. {leaderboard.currentUser.name} -{' '}
            {leaderboard.currentUser.count} workouts
          </li>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
