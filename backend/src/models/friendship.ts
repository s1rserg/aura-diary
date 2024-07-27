import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface FriendshipAttributes {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FriendshipCreationAttributes
  extends Optional<FriendshipAttributes, 'id'> {}

class Friendship
  extends Model<FriendshipAttributes, FriendshipCreationAttributes>
  implements FriendshipAttributes
{
  public id!: string;
  public userId!: string;
  public friendId!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Friendship.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'denied'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Friendship',
    timestamps: true,
  },
);

export default Friendship;
