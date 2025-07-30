import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../../libs/database/database';
import {
  CategoryType,
  EquipmentType,
  ForceType,
  LevelType,
  MechanicType,
  Muscle,
} from '../../libs/common/common';

class Exercise extends Model<
  InferAttributes<Exercise>,
  InferCreationAttributes<Exercise>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare aliases: string[] | null;
  declare primary_muscles: Muscle[];
  declare secondary_muscles: Muscle[] | null;
  declare force: ForceType | null;
  declare level: LevelType;
  declare mechanic: MechanicType | null;
  declare equipment: EquipmentType | null;
  declare category: CategoryType;
  declare instructions: string[] | null;
  declare description: string | null;
  declare tips: string[] | null;
  declare date_created: CreationOptional<Date>;
  declare date_updated: CreationOptional<Date>;
}

Exercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    aliases: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    primary_muscles: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Muscle))),
      allowNull: false,
    },
    secondary_muscles: {
      type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(Muscle))),
      allowNull: true,
    },
    force: {
      type: DataTypes.ENUM(...Object.values(ForceType)),
      allowNull: true,
    },
    level: {
      type: DataTypes.ENUM(...Object.values(LevelType)),
      allowNull: false,
    },
    mechanic: {
      type: DataTypes.ENUM(...Object.values(MechanicType)),
      allowNull: true,
    },
    equipment: {
      type: DataTypes.ENUM(...Object.values(EquipmentType)),
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(CategoryType)),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tips: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Exercise',
    tableName: 'exercises',
    timestamps: false,
  },
);

export { Exercise };
