import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

type Trigger =
  | 'photo'
  | 'conversation'
  | 'movie'
  | 'reading'
  | 'boredom'
  | 'schedule😎'
  | 'other';

type WorkoutEntry = {
  id: string;
  userId: string;
  date: Date;
  duration: number; // duration in minutes
  rating: number; // rating from 1 to 10
  trigger?: Trigger;
  energyLevelBefore?: number; // scale of 1 to 10
  energyLevelAfter?: number; // scale of 1 to 10
  times: number; // calculated field
};

export { type WorkoutEntry, type Trigger };
