import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../../libs/database/database';
import { WorkoutExercise } from './workout-exercise.model';
import { Exercise } from '../exercises/exercise.model';
import { Workout } from './workout.model';

class WorkoutSet extends Model<
  InferAttributes<WorkoutSet>,
  InferCreationAttributes<WorkoutSet>
> {
  declare id: CreationOptional<string>;
  declare workout_exercise_id: ForeignKey<WorkoutExercise['id']>;
  declare reps: number;
  declare weight: number | null;
  declare duration: number | null;
  declare distance: number | null;
  declare order: number;
}

WorkoutSet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workout_exercise_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'WorkoutSet',
    tableName: 'workout_sets',
    timestamps: false,
  },
);

Exercise.hasMany(WorkoutExercise, { foreignKey: 'exercise_id' });
WorkoutExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' });

Workout.hasMany(WorkoutExercise, { foreignKey: 'workout_id' });
WorkoutExercise.belongsTo(Workout, { foreignKey: 'workout_id' });

WorkoutExercise.hasMany(WorkoutSet, { foreignKey: 'workout_exercise_id' });
WorkoutSet.belongsTo(WorkoutExercise, { foreignKey: 'workout_exercise_id' });

export { WorkoutSet };
