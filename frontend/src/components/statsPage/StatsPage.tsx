import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUserStats } from "../../store/workouts/actions";
import "./StatsPage.css";
import StatCard from "./components/statCard/StatCard";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { DataStatus } from "../../common/enums/enums";
import { useTranslation } from "react-i18next";

const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string | undefined }>();

  const dispatch = useAppDispatch();
  const { userStats: stats, status } = useAppSelector(
    (state) => state.workouts
  );

  useEffect(() => {
    const loadStats = async () => {
      await dispatch(fetchUserStats(userId));
    };
    loadStats();
  }, [dispatch, userId]);

  if (status === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <div className="stats-page">
      <h1 className="username">{stats?.name}</h1>
      <div className="stats-grid">
        <StatCard title={t('total workouts')} value={stats?.totalWorkouts} />
        <StatCard
          title={t('total duration')}
          value={`${stats?.totalDuration} ${t('mins')}`}
        />
        <StatCard
          title={t('avg workout duration')}
          value={`${stats?.averageWorkoutDuration.toFixed(1)} ${t('mins')}`}
        />
        <StatCard
          title={t('longest workout')}
          value={`${stats?.highestDurationWorkout} ${t('mins')}`}
        />
        <StatCard title={t('avg rating')} value={stats?.averageRating.toFixed(1)} />
        <StatCard
          title={t('mood level improvement')}
          value={`${stats?.energyLevelImprovement.toFixed(1)}%`}
        />
        <StatCard
          title={t('consistency')}
          value={stats?.totalTimesWorkedOut}
        />
        <StatCard title={t('consistency')} value={`${stats?.consistency} ${t('days')}`} />
      </div>
    </div>
  );
};

export default StatsPage;
