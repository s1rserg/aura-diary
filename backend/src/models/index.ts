import sequelize from '../config/database';
import User from './user';

const models = {
  User,
};

// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

export { sequelize };
export default models;
