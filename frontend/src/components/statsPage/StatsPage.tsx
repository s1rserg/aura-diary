import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchUserStats } from '../../store/workouts/actions';
import './StatsPage.css';
import StatCard from './components/statCard/StatCard';
import { Link, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { DataStatus } from '../../common/enums/enums';
import { useTranslation } from 'react-i18next';
import podiumIcon from '../../assets/images/podium.svg';
import PrivacyToggle from '../privacyToggle/PrivacyToggle';
import { togglePrivacy } from '../../store/auth/actions';

const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string | undefined }>();
  const dispatch = useAppDispatch();
  const { userStats: stats, status } = useAppSelector(
    (state) => state.workouts,
  );
  const [privacy, setPrivacy] = useState<string | undefined | null>(undefined);

  const handlePrivacyChange = async () => {
    await dispatch(togglePrivacy());
    setPrivacy(privacy === 'private' ? 'public' : 'private');
  };

  useEffect(() => {
    const loadStats = async () => {
      await dispatch(fetchUserStats(userId));
      setPrivacy(stats?.privacy);
    };
    loadStats();
  }, [dispatch, stats?.privacy, userId]);

  if (status === DataStatus.PENDING) {
    return <Loader />;
  }

  if (userId !== 'default' && stats?.privacy === 'private') {
    return (
      <div className="stats-page">
        <h1 className="username">{stats?.name}</h1>
        <h2>Profile is private</h2>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <h1 className="username">{stats?.name}</h1>
      {userId === 'default' && (
        <Link to="/stats/leaderboard">
          <img
            className="header__icon"
            src={podiumIcon}
            alt="leaderboard-icon"
          />
        </Link>
      )}
      {userId === 'default' && (
        <PrivacyToggle
          privacy={privacy}
          handlePrivacyChange={handlePrivacyChange}
        />
      )}
      <h2>Monthly Stats</h2>
      <div className="stats-grid">
        <StatCard
          title={t('total workouts')}
          value={stats?.monthlyStats.totalWorkouts}
        />
        <StatCard
          title={t('total times worked out')}
          value={stats?.monthlyStats.totalTimesWorkedOut}
        />
        <StatCard
          title={t('total duration')}
          value={`${stats?.monthlyStats.totalDuration} ${t('mins')}`}
        />
        <StatCard
          title={t('avg workout duration')}
          value={`${stats?.monthlyStats.averageWorkoutDuration} ${t('mins')}`}
        />
        <StatCard
          title={t('longest workout')}
          value={`${stats?.monthlyStats.highestDurationWorkout} ${t('mins')}`}
        />
        <StatCard
          title={t('avg rating')}
          value={stats?.monthlyStats.averageRating}
        />
        <StatCard
          title={t('mood level improvement')}
          value={`${stats?.monthlyStats.energyLevelImprovement}%`}
        />
        <StatCard
          title={t('active days ratio')}
          value={`${stats?.monthlyStats.totalDaysWorkedOut}/${stats?.monthlyStats.totalDaysInMonth}`}
        />
      </div>
      <h2>Total Stats</h2>
      <div className="stats-grid">
        <StatCard
          title={t('total workouts')}
          value={stats?.totalStats.totalWorkouts}
        />
        <StatCard
          title={t('total times worked out')}
          value={stats?.totalStats.totalTimesWorkedOut}
        />
        <StatCard
          title={t('total duration')}
          value={`${stats?.totalStats.totalDuration} ${t('mins')}`}
        />
        <StatCard
          title={t('avg workout duration')}
          value={`${stats?.totalStats.averageWorkoutDuration} ${t('mins')}`}
        />
        <StatCard
          title={t('longest workout')}
          value={`${stats?.totalStats.highestDurationWorkout} ${t('mins')}`}
        />
        <StatCard
          title={t('avg rating')}
          value={stats?.totalStats.averageRating}
        />
        <StatCard
          title={t('mood level improvement')}
          value={`${stats?.totalStats.energyLevelImprovement}%`}
        />
        <StatCard
          title={t('consistency')}
          value={`${stats?.totalStats.consistency} ${t('days')}`}
        />
      </div>
    </div>
  );
};

export default StatsPage;
