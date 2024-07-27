import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from '../common/types/types';
import Workouts from '../models/workouts';
import sequelize from '../config/database';
import { Op } from 'sequelize';
import User from '../models/user';

dotenv.config();

interface DateQueryParams {
  start: string;
  end: string;
}

const getWorkoutsForPeriod = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query as unknown as DateQueryParams;
    const workouts = await Workouts.findAll({
      where: {
        userId: (req as AuthenticatedRequest).user.id,
        date: {
          [Op.between]: [start, end],
        },
      },
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

const editWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    duration,
    rating,
    trigger,
    energyLevelBefore,
    energyLevelAfter,
    times,
  } = req.body;
  try {
    const workout = await Workouts.findByPk(id);
    if (workout) {
      workout.duration = duration;
      workout.rating = rating;
      workout.trigger = trigger;
      workout.energyLevelBefore = energyLevelBefore;
      workout.energyLevelAfter = energyLevelAfter;
      workout.times = times;
      await workout.save();
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ emessage: 'Error editing workout', error });
  }
};

const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workouts.findByPk(id);
    if (workout) {
      await workout.destroy();
      res.json({ message: 'Workout deleted' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
};

const postWorkout = async (req: Request, res: Response) => {
  const {
    id,
    date,
    duration,
    rating,
    trigger,
    energyLevelBefore,
    energyLevelAfter,
    times,
  } = req.body;
  try {
    const newWorkout = await Workouts.create({
      userId: (req as AuthenticatedRequest).user.id,
      date,
      duration,
      rating,
      trigger,
      energyLevelBefore,
      energyLevelAfter,
      times,
    });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout', error });
  }
};

const getUserStatistics = async (req: Request, res: Response) => {
  const userId =
    (req.query.userId as string) || (req as AuthenticatedRequest).user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const workouts = await Workouts.findAll({ where: { userId } });

    if (!workouts || workouts.length === 0) {
      res.status(200).json({
        name: user.name,
        totalStats: {
          totalWorkouts: 0,
          totalDuration: 0,
          averageWorkoutDuration: 0,
          highestDurationWorkout: 0,
          averageRating: 0,
          energyLevelImprovement: 0,
          totalTimesWorkedOut: 0,
          consistency: 0,
        },
        monthlyStats: {
          totalWorkouts: 0,
          totalDuration: 0,
          averageWorkoutDuration: 0,
          highestDurationWorkout: 0,
          averageRating: 0,
          energyLevelImprovement: 0,
          totalTimesWorkedOut: 0,
          totalDaysWorkedOut: 0,
          totalDaysInMonth: new Date().getDate(),
        },
      });
      return;
    }

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0,
    );
    const averageWorkoutDuration = totalDuration / totalWorkouts;
    const highestDurationWorkout = Math.max(
      ...workouts.map((workout) => workout.duration),
    );

    const averageRating =
      workouts.reduce((sum, workout) => sum + workout.rating, 0) /
      totalWorkouts;

    const energyLevelImprovement =
      workouts.reduce((sum, workout) => {
        return (
          sum +
          (workout.energyLevelAfter - workout.energyLevelBefore) /
            workout.energyLevelBefore
        );
      }, 0) * 10;

    const totalTimesWorkedOut = workouts.reduce(
      (sum, workout) => sum + workout.times,
      0,
    );

    const dates = workouts.map((workout) => new Date(workout.date));
    dates.sort((a, b) => a.getTime() - b.getTime());

    let streaks = 0;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const currentDate = dates[i];
      const previousDate = dates[i - 1];
      const diff =
        (currentDate.getTime() - previousDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
      } else {
        streaks = Math.max(streaks, currentStreak);
        currentStreak = 1;
      }
    }

    streaks = Math.max(streaks, currentStreak);

    // Calculate monthly statistics
    const currentMonthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const currentMonthEnd = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    const monthlyWorkouts = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= currentMonthStart && workoutDate <= currentMonthEnd;
    });

    const monthlyTotalWorkouts = monthlyWorkouts.length;
    const monthlyTotalDuration = monthlyWorkouts.reduce(
      (sum, workout) => sum + workout.duration,
      0,
    );
    const monthlyAverageWorkoutDuration =
      monthlyTotalWorkouts > 0
        ? monthlyTotalDuration / monthlyTotalWorkouts
        : 0;
    const monthlyHighestDurationWorkout = Math.max(
      ...monthlyWorkouts.map((workout) => workout.duration),
      0,
    );
    const monthlyAverageRating =
      monthlyWorkouts.reduce((sum, workout) => sum + workout.rating, 0) /
      (monthlyTotalWorkouts || 1);
    const monthlyEnergyLevelImprovement =
      monthlyWorkouts.reduce((sum, workout) => {
        return (
          sum +
          (workout.energyLevelAfter - workout.energyLevelBefore) /
            workout.energyLevelBefore
        );
      }, 0) * 10;
    const monthlyTotalTimesWorkedOut = monthlyWorkouts.reduce(
      (sum, workout) => sum + workout.times,
      0,
    );

    const uniqueWorkoutDates = new Set(
      monthlyWorkouts.map((workout) => new Date(workout.date).toDateString()),
    );
    const totalDaysWorkedOut = uniqueWorkoutDates.size;
    const totalDaysInMonth = new Date().getDate();

    res.status(200).json({
      name: user.name,
      totalStats: {
        totalWorkouts,
        totalDuration,
        averageWorkoutDuration,
        highestDurationWorkout,
        averageRating,
        energyLevelImprovement,
        totalTimesWorkedOut,
        consistency: streaks,
      },
      monthlyStats: {
        totalWorkouts: monthlyTotalWorkouts,
        totalDuration: monthlyTotalDuration,
        averageWorkoutDuration: monthlyAverageWorkoutDuration,
        highestDurationWorkout: monthlyHighestDurationWorkout,
        averageRating: monthlyAverageRating,
        energyLevelImprovement: monthlyEnergyLevelImprovement,
        totalTimesWorkedOut: monthlyTotalTimesWorkedOut,
        totalDaysWorkedOut,
        totalDaysInMonth,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user statistics:', error });
  }
};

interface UserWorkoutCount {
  userId: string;
  name: string;
  count: number;
  rank: number;
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const userId =
      (req.query.userId as string) || (req as AuthenticatedRequest).user.id;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const workouts = await Workouts.findAll({
      where: {
        date: {
          [Op.gte]: startOfMonth,
        },
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    });

    const userWorkoutCounts = workouts.reduce<{
      [key: string]: UserWorkoutCount;
    }>((acc, workout) => {
      const userId = workout.userId;
      if (!acc[userId]) {
        acc[userId] = {
          userId,
          name: (workout as any).user.name,
          count: 0,
          rank: 0,
        };
      }
      acc[userId].count += 1;
      return acc;
    }, {});

    const leaderboard = Object.values(userWorkoutCounts).sort(
      (a, b) => b.count - a.count,
    );

    const currentUserRank = leaderboard.findIndex(
      (user) => user.userId === userId,
    );

    const topUsers = leaderboard.slice(0, 10);

    const currentUser = {
      userId,
      name: User.name,
      count: userWorkoutCounts[userId].count,
      rank: currentUserRank + 1,
    };

    res.status(200).json({ leaders: topUsers, currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};

export {
  editWorkout,
  deleteWorkout,
  postWorkout,
  getWorkoutsForPeriod,
  getUserStatistics,
};
