import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import sequelize from '../../libs/database/database';
import { User } from '../users/user.model';

class Workout extends Model<
  InferAttributes<Workout>,
  InferCreationAttributes<Workout>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare notes: string | null;

  declare userId: ForeignKey<User['id']>;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Workout',
    tableName: 'workouts',
    timestamps: true,
  },
);

Workout.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
User.hasMany(Workout, {
  foreignKey: 'userId',
  as: 'workouts',
});

export { Workout };
