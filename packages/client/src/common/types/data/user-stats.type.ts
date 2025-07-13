type UserStatistics = {
  name: string;
  privacy: string;
  isAllowed: boolean;
  totalStats: {
    totalWorkouts: number;
    totalDuration: number;
    averageWorkoutDuration: number;
    highestDurationWorkout: number;
    averageRating: number;
    energyLevelImprovement: number;
    totalTimesWorkedOut: number;
    consistency: number;
  };
  monthlyStats: {
    totalWorkouts: number;
    totalDuration: number;
    averageWorkoutDuration: number;
    highestDurationWorkout: number;
    averageRating: number;
    energyLevelImprovement: number;
    totalTimesWorkedOut: number;
    totalDaysInMonth: number;
    totalDaysWorkedOut: number;
  };
};

export { type UserStatistics };
