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
  | 'idk'
  | 'other';

type WorkoutEntry = {
  id: string;
  userId: string;
  date: Date;
  duration: number;
  rating: number;
  trigger: Trigger;
  energyLevelBefore: number;
  energyLevelAfter: number;
  times: number;
};

export { type WorkoutEntry, type Trigger };
