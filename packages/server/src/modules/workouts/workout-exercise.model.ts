import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../../libs/database/database';
import { Workout } from './workout.model';
import { Exercise } from '../exercises/exercise.model';

class WorkoutExercise extends Model<
  InferAttributes<WorkoutExercise>,
  InferCreationAttributes<WorkoutExercise>
> {
  declare id: CreationOptional<string>;
  declare workout_id: ForeignKey<Workout['id']>;
  declare exercise_id: ForeignKey<Exercise['id']>;
  declare order: number;
}

WorkoutExercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workout_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'WorkoutExercise',
    tableName: 'workout_exercises',
    timestamps: false,
  },
);

export { WorkoutExercise };
