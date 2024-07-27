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

const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workouts.findAll({
      where: { userId: (req as AuthenticatedRequest).user.id },
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

const getWorkoutsCounts = async (req: Request, res: Response) => {
  try {
    const counts = await Workouts.findAll({
      where: { userId: (req as AuthenticatedRequest).user.id },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('date')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['date'],
    });
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts counts', error });
  }
};

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

const getAllWorkoutsByDate = async (req: Request, res: Response) => {
  try {
    const workouts = await Workouts.findAll({
      where: {
        userId: (req as AuthenticatedRequest).user.id,
        date: req.params,
      },
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
};

const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workouts.findByPk(id);
    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout', error });
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

    // Fetch all workouts for the user
    const workouts = await Workouts.findAll({ where: { userId } });

    if (!workouts || workouts.length === 0) {
      res.status(200).json({
        name: user.name,
        totalWorkouts: 0,
        totalDuration: 0,
        averageWorkoutDuration: 0,
        highestDurationWorkout: 0,
        averageRating: 0,
        mostCommonTrigger: null,
        energyLevelImprovement: 0,
        totalTimesWorkedOut: 0,
        consistency: 0,
        totalWorkoutsPerTrigger: {},
      });
      return;
    }

    // Total Workouts
    const totalWorkouts = workouts.length;

    // Total Duration
    const totalDuration = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0,
    );

    // Average Workout Duration
    const averageWorkoutDuration = totalDuration / totalWorkouts;

    // Highest Duration Workout
    const highestDurationWorkout = Math.max(
      ...workouts.map((workout) => workout.duration),
    );

    // Average Rating
    const averageRating =
      workouts.reduce((sum, workout) => sum + workout.rating, 0) /
      totalWorkouts;

    // Energy Level Improvement
    const energyLevelImprovement =
      (workouts.reduce((sum, workout) => {
        if (
          workout.energyLevelBefore !== undefined &&
          workout.energyLevelAfter !== undefined
        ) {
          return sum + (workout.energyLevelAfter - workout.energyLevelBefore);
        }
        return sum;
      }, 0) /
        totalWorkouts) *
      100;

    // Total Times Worked Out
    const totalTimesWorkedOut = workouts.reduce(
      (sum, workout) => sum + workout.times,
      0,
    );

    // Consistency (Streaks)
    const dates = workouts.map((workout) => new Date(workout.date));
    dates.sort((a, b) => a.getTime() - b.getTime());

    let streaks = 0;
    let currentStreak = 1;

    for (let i = 1; i < dates.length; i++) {
      const currentDate = dates[i];
      const previousDate = dates[i - 1];
      const diff =
        (currentDate.getTime() - previousDate.getTime()) /
        (1000 * 60 * 60 * 24); // Difference in days

      if (diff === 1) {
        currentStreak++;
      } else {
        streaks = Math.max(streaks, currentStreak);
        currentStreak = 1;
      }
    }

    streaks = Math.max(streaks, currentStreak);

    res.status(200).json({
      name: user.name,
      totalWorkouts,
      totalDuration,
      averageWorkoutDuration,
      highestDurationWorkout,
      averageRating,
      energyLevelImprovement,
      totalTimesWorkedOut,
      consistency: streaks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user statistics:', error });
  }
};

export {
  getAllWorkouts,
  getAllWorkoutsByDate,
  getWorkoutById,
  editWorkout,
  deleteWorkout,
  postWorkout,
  getWorkoutsCounts,
  getWorkoutsForPeriod,
  getUserStatistics,
};
