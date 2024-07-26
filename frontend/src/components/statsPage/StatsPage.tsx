import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUserStats } from "../../store/workouts/actions";
import "./StatsPage.css";
import StatCard from "./components/statCard/StatCard";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { DataStatus } from "../../common/enums/enums";

const StatsPage: React.FC = () => {
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
        <StatCard title="Total Workouts" value={stats?.totalWorkouts} />
        <StatCard
          title="Total Duration"
          value={`${stats?.totalDuration} mins`}
        />
        <StatCard
          title="Avg. Workout Duration"
          value={`${stats?.averageWorkoutDuration.toFixed(1)} mins`}
        />
        <StatCard
          title="Longest Workout"
          value={`${stats?.highestDurationWorkout} mins`}
        />
        <StatCard title="Avg. Rating" value={stats?.averageRating.toFixed(1)} />
        <StatCard
          title="Energy Level Improvement"
          value={`${stats?.energyLevelImprovement.toFixed(1)}%`}
        />
        <StatCard
          title="Total Times Worked Out"
          value={stats?.totalTimesWorkedOut}
        />
        <StatCard title="Consistency" value={`${stats?.consistency} days`} />
      </div>
    </div>
  );
};

export default StatsPage;
