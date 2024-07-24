import { Request, Response } from "express";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../common/types/types";
import Workouts from "../models/workouts";
import sequelize from "../config/database";
import { Op } from "sequelize";

dotenv.config();

interface DateQueryParams {
  start: string;
  end: string;
}

const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workouts.findAll({
      where: {userId: (req as AuthenticatedRequest).user.id},
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts", error });
  }
};

const getWorkoutsCounts = async (req: Request, res: Response) => {
  try {
    const counts = await Workouts.findAll({
      where: { userId: (req as AuthenticatedRequest).user.id },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('date')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['date']
    });
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts counts", error });
  }
};

const getWorkoutsForPeriod = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query as unknown as DateQueryParams;
    const workouts = await Workouts.findAll({
      where: {
        userId: (req as AuthenticatedRequest).user.id,
        date: {
          [Op.between]: [start, end]
        }
      },
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts", error });
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
    res.status(500).json({ message: "Error fetching workouts", error });
  }
};

const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workouts.findByPk(id);
    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout", error });
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
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ emessage: "Error editing workout", error });
  }
};

const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workouts.findByPk(id);
    if (workout) {
      await workout.destroy();
      res.json({ message: "Workout deleted" });
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout", error });
  }
};

const postWorkout = async (req: Request, res: Response) => {
    const { id, date, duration, rating, trigger, energyLevelBefore, energyLevelAfter, times } = req.body;
    try {
      const newWorkout = await Workouts.create({
        userId: (req as AuthenticatedRequest).user.id,
        date,
        duration,
        rating,
        trigger,
        energyLevelBefore,
        energyLevelAfter,
        times
      });
      res.status(201).json(newWorkout);
    } catch (error) {
      res.status(500).json({ message: "Error creating workout", error });
    }
  };

export { getAllWorkouts, getAllWorkoutsByDate, getWorkoutById, editWorkout, deleteWorkout, postWorkout, getWorkoutsCounts, getWorkoutsForPeriod };
