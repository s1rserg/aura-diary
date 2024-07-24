import sequelize from '../config/database';
import Friendship from './friendship';
import User from './user';
import Workouts from './workouts'

const models = {
  User,
  Workouts,
  Friendship
};

// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

export { sequelize };
export default models;
