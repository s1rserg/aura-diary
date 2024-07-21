type Location = 'home' | 'under Oleksandr\'s window' | 'other';
type Trigger = 'photo' | 'conversation' | 'movie' | 'reading' | 'boredom' | 'schedule😎' | 'other';

type WorkoutEntry = {
  id: string;
  date: Date;
  duration: number;  // duration in minutes
  rating: number;  // rating from 1 to 10
  location?: Location;
  trigger?: Trigger;
  energyLevelBefore?: number;  // scale of 1 to 10
  energyLevelAfter?: number;  // scale of 1 to 10
  times: number;  // calculated field
}

export { type WorkoutEntry, type Location, type Trigger }