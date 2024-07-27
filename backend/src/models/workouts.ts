import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { WorkoutEntry } from '../common/types/types';

interface WorkoutCreationAttributes extends Optional<WorkoutEntry, 'id'> {}

class Workouts
  extends Model<WorkoutEntry, WorkoutCreationAttributes>
  implements WorkoutEntry
{
  public id!: string;
  public userId!: string;
  public date!: Date;
  public duration!: number;
  public rating!: number;
  public trigger!:
    | 'photo'
    | 'conversation'
    | 'movie'
    | 'reading'
    | 'boredom'
    | 'schedule😎'
    | 'idk'
    | 'other';
  public energyLevelBefore!: number;
  public energyLevelAfter!: number;
  public times!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Workouts.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trigger: {
      type: DataTypes.ENUM(
        'photo',
        'conversation',
        'movie',
        'reading',
        'boredom',
        'schedule😎',
        'idk',
        'other',
      ),
      allowNull: true,
    },
    energyLevelBefore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    energyLevelAfter: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    times: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Workouts',
    timestamps: true,
  },
);

export default Workouts;
