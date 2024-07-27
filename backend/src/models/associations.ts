import Friendship from './friendship';
import User from './user';

const defineAssociations = () => {
  User.hasMany(Friendship, { as: 'sentRequests', foreignKey: 'userId' });
  User.hasMany(Friendship, { as: 'receivedRequests', foreignKey: 'friendId' });

  Friendship.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friendId' });
};

export default defineAssociations;
