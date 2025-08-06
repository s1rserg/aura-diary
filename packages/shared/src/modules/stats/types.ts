export type StatsAllPeriodsData = {
  week: StatsPeriodData;
  month: StatsPeriodData;
  year: StatsPeriodData;
};

export type StatsPeriodData = {
  period: 'week' | 'month' | 'year';
  totalVolume: number;
  totalDuration: number;
  workoutsPerDay: Record<string, number>; // e.g., "2025-08-01": 2
  muscleMap: Record<string, number>; // e.g., "chest": 4
  categoryMap: Record<string, number>; // e.g., "strength": 6
};
