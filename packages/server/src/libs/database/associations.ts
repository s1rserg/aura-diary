import Friendship from '../../modules/friendships/friendship.model';
import { User } from '../../modules/users/user.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sequelize from './database';

const defineAssociations = () => {
  User.hasMany(Friendship, { as: 'sentRequests', foreignKey: 'userId' });
  User.hasMany(Friendship, { as: 'receivedRequests', foreignKey: 'friendId' });

  Friendship.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friendId' });
};

export { defineAssociations };
