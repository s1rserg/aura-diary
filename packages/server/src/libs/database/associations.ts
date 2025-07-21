import { Exercise } from '../../modules/exercises/exercise.model';
import Friendship from '../../modules/friendships/friendship.model';
import { User } from '../../modules/users/user.model';
import { WorkoutExercise } from '../../modules/workouts/workout-exercise.model';
import { WorkoutSet } from '../../modules/workouts/workout-set.model';
import { Workout } from '../../modules/workouts/workout.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sequelize from './database';

const defineAssociations = () => {
  User.hasMany(Friendship, { as: 'sentRequests', foreignKey: 'userId' });
  User.hasMany(Friendship, { as: 'receivedRequests', foreignKey: 'friendId' });

  Friendship.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friendId' });

  Workout.hasMany(WorkoutExercise, { foreignKey: 'workout_id' });
  WorkoutExercise.belongsTo(Workout, { foreignKey: 'workout_id' });

  Exercise.hasMany(WorkoutExercise, { foreignKey: 'exercise_id' });
  WorkoutExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' });

  WorkoutExercise.hasMany(WorkoutSet, { foreignKey: 'workout_exercise_id' });
  WorkoutSet.belongsTo(WorkoutExercise, { foreignKey: 'workout_exercise_id' });
};

export { defineAssociations };
