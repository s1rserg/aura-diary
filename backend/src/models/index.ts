import sequelize from '../config/database';
import User from './user';
import Workouts from './workouts'

const models = {
  User,
  Workouts
};

// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

export { sequelize };
export default models;
