import express from 'express';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import workoutsRoutes from './routes/workoutsRoutes';
import dotenv from 'dotenv';
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/workouts', workoutsRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
