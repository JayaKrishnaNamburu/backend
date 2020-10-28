import { Model, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { Cart } from "../cart/entity";
import { Order } from "../order/entity";

export class User extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.USERS);
  User.init(
    {
      [DATABASE_COLUMNS.USERS.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      [DATABASE_COLUMNS.USERS.IS_ADMIN]: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      [DATABASE_COLUMNS.USERS.NAME]: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      [DATABASE_COLUMNS.USERS.EMAIL]: {
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
      [DATABASE_COLUMNS.USERS.PASSWORD_DIGEST]: {
        type: DataTypes.STRING,
        field: "password_digest",
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      [DATABASE_COLUMNS.USERS.PHONE]: {
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

  User.hasMany(Order, {
    as: "orders",
    foreignKey: DATABASE_COLUMNS.ORDER.USER_ID,
  });
}
