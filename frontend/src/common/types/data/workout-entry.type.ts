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
  date: Date;
  duration: number; // duration in minutes
  rating: number; // rating from 1 to 10
  trigger?: Trigger;
  energyLevelBefore?: number; // scale of 1 to 10
  energyLevelAfter?: number; // scale of 1 to 10
  sets: number;
  times: number;
};

export { type WorkoutEntry, type Trigger };
