import { Model, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { Cart } from "../cart/entity";

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
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
      password_digest: {
        type: DataTypes.STRING,
        field: "password_digest",
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

function initAssociations(): void {
  User.hasOne(Cart, {
    as: "cart",
    foreignKey: DATABASE_COLUMNS.CART.USER_ID,
  });
}
