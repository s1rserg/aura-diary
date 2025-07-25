import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../libs/database/database';

class Workout extends Model<
  InferAttributes<Workout>,
  InferCreationAttributes<Workout>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare notes: string | null;
}

Workout.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Workout',
    tableName: 'workouts',
    timestamps: true,
  },
);

export { Workout };
