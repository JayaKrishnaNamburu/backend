import { Model, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";

export class User extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.USERS);
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    modelConfig
  );
}

function initAssociations(): void {}
