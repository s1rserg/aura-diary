import sequelize from './database';
import { Exercise } from '../../modules/exercises/exercise.model';
import {
  CategoryType,
  EquipmentType,
  ForceType,
  LevelType,
  MechanicType,
  Muscle,
} from '../common/common';
import exercisesData from './seed/exercises.json';
import { v4 as uuidv4 } from 'uuid';

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const exercisesToCreate = exercisesData.exercises.map((e) => ({
      id: uuidv4(),
      name: e.name,
      force: e.force as ForceType | null,
      level: e.level as LevelType,
      mechanic: e.mechanic as MechanicType | null,
      equipment: e.equipment as EquipmentType | null,
      primary_muscles: e.primaryMuscles as Muscle[],
      secondary_muscles: e.secondaryMuscles.length
        ? (e.secondaryMuscles as Muscle[])
        : [],
      instructions: e.instructions,
      category: e.category as CategoryType,
    }));

    await Exercise.bulkCreate(exercisesToCreate, {
      ignoreDuplicates: true,
    });

    console.log(
      `Successfully seeded ${exercisesData.exercises.length} exercises.`,
    );
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
