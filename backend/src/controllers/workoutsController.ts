import { Request, Response } from "express";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../common/types/types";
import Workouts from "../models/workouts";

dotenv.config();

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
    location,
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
      workout.location = location;
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
    const { id, date, duration, rating, location, trigger, energyLevelBefore, energyLevelAfter, times } = req.body;
    try {
      const newWorkout = await Workouts.create({
        userId: (req as AuthenticatedRequest).user.id,
        date,
        duration,
        rating,
        location,
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

export { getAllWorkouts, getAllWorkoutsByDate, getWorkoutById, editWorkout, deleteWorkout, postWorkout };
