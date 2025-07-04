import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../libs/database/database';

interface IUser {
  id: string;
  name: string;
  privacy: 'private' | 'public';
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public name!: string;
  public privacy!: 'private' | 'public';
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privacy: {
      type: DataTypes.ENUM('private', 'public'),
      allowNull: false,
      defaultValue: 'private',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    indexes: [{ fields: ['email'] }],
  },
);

export { User, IUser };
