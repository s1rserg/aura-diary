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
  declare date: Date;
  declare notes: string | null;
  declare date_created: CreationOptional<Date>;
  declare date_updated: CreationOptional<Date>;
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Workout',
    tableName: 'workouts',
    timestamps: false,
  },
);

export { Workout };
