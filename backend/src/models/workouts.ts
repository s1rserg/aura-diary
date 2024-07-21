import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface WorkoutsAttributes {
  id: string;
  userId: string;
  date: Date;
  duration: number;
  rating: number;
  location?: 'home' | "under Oleksandr's window" | 'other';
  trigger?: 'photo' | 'conversation' | 'movie' | 'reading' | 'boredom' | 'schedule😎' | 'other';
  energyLevelBefore?: number;
  energyLevelAfter?: number;
  times: number;
}

interface WorkoutCreationAttributes extends Optional<WorkoutsAttributes, 'id'> {}

class Workouts extends Model<WorkoutsAttributes, WorkoutCreationAttributes> implements WorkoutsAttributes {
  public id!: string;
  public userId!: string;
  public date!: Date;
  public duration!: number;
  public rating!: number;
  public location?: 'home' | "under Oleksandr's window" | 'other';
  public trigger?: 'photo' | 'conversation' | 'movie' | 'reading' | 'boredom' | 'schedule😎' | 'other';
  public energyLevelBefore?: number;
  public energyLevelAfter?: number;
  public times!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Workouts.init({
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
    type: DataTypes.DATE,
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
  location: {
    type: DataTypes.ENUM('home', "under Oleksandr's window", 'other'),
    allowNull: true,
  },
  trigger: {
    type: DataTypes.ENUM('photo', 'conversation', 'movie', 'reading', 'boredom', 'schedule😎', 'other'),
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
}, {
  sequelize,
  modelName: 'Workouts',
  timestamps: true,
});

export default Workouts;
