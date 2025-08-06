import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '~/store/store';
import styles from './styles.module.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Loader, Select } from '../../components/components';
import { actions } from '../../store/stats/stats';
import { DataStatus } from '../../common/enums/enums';
import { useAppForm } from '../../hooks/hooks';
import { SelectOption } from '../../common/types/types';
import { useWatch } from 'react-hook-form';

const COLORS = [
  '#a259ff',
  '#4caf50',
  '#ffca28',
  '#f44336',
  '#4FC3F7',
  '#FF8A65',
];

const PERIOD_OPTIONS: SelectOption<'week' | 'month' | 'year'>[] = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

type Props = {
  userId: string | undefined;
};

const StatsPage = ({ userId }: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const statsAll = useSelector((state: RootState) => state.stats.stats);
  const status = useSelector((state: RootState) => state.stats.status);

  useEffect(() => {
    dispatch(actions.getAllPeriodsStats(userId || ''));
  }, [dispatch]);

  const { control } = useAppForm({
    defaultValues: { period: 'week' },
  });

  const selectedPeriod = useWatch({
    control,
    name: 'period',
  });

  if (!userId) {
    return <></>;
  }

  if (status === DataStatus.PENDING || !statsAll) {
    return <Loader />;
  }

  const stats = statsAll?.[selectedPeriod as keyof typeof statsAll];

  const workoutsPerDayData = Object.entries(stats.workoutsPerDay).map(
    ([date, count]) => ({
      date,
      count,
    }),
  );

  const muscleMapData = Object.entries(stats.muscleMap).map(
    ([muscle, value]) => ({
      name: muscle,
      value,
    }),
  );

  const categoryMapData = Object.entries(stats.categoryMap).map(
    ([category, value]) => ({
      name: category,
      value,
    }),
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Workout Stats</h1>

      <div className={styles.controls}>
        <Select
          control={control}
          name="period"
          label="Period"
          options={PERIOD_OPTIONS}
          isSearchable={false}
          background="primary"
        />
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total Volume</h3>
          <p>{stats.totalVolume} kg</p>
        </div>
        <div className={styles.card}>
          <h3>Total Duration</h3>
          <p>{Math.round(stats.totalDuration / 60)} min</p>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h3>Workouts Per Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workoutsPerDayData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h3>Muscle Groups Trained</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={muscleMapData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {muscleMapData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h3>Workout Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryMapData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
