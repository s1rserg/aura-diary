type UserStatistics = {
  name: string;
  totalWorkouts: number;
  totalDuration: number; // in minutes
  averageWorkoutDuration: number; // in minutes
  highestDurationWorkout: number; // in minutes
  averageRating: number; // rating from 1 to 10
  energyLevelImprovement: number; // average improvement in energy levels
  totalTimesWorkedOut: number; // total number of times worked out
  consistency: number; // longest streak in days or weeks
};

export { type UserStatistics };
