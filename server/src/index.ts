/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import sequelize from './libs/database/database';
import errorHandler from './libs/middlewares/error.middleware';
import authRoutes from './modules/users/auth.route';
import userRoutes from './modules/users/user.route';
import { defineAssociations } from './libs/database/associations';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);

app.use('/users', userRoutes);

// app.use('/workouts', workoutsRoutes);

// app.use('/friends', friendsRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    defineAssociations;
    await sequelize.sync({ alter: true });
    app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
