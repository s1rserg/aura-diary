import Friendship from '../../modules/friendships/friendship.model';
import { User } from '../../modules/users/user.model';
import Workouts from '../../modules/workouts/workout.model';

const defineAssociations = () => {
  User.hasMany(Workouts, { as: 'workouts', foreignKey: 'userId' });
  Workouts.belongsTo(User, { as: 'user', foreignKey: 'userId' });

  User.hasMany(Friendship, { as: 'sentRequests', foreignKey: 'userId' });
  User.hasMany(Friendship, { as: 'receivedRequests', foreignKey: 'friendId' });

  Friendship.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friendId' });
};

export { defineAssociations };
