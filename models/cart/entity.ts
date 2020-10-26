import { Model, DataTypes } from "sequelize";
import { DATABASE_MODELS, DATABASE_COLUMNS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { User } from "../user/entity";

export class Cart extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.CART);
  Cart.init(
    {
      [DATABASE_COLUMNS.CART.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      [DATABASE_COLUMNS.CART.USER_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.USERS,
          key: DATABASE_COLUMNS.USERS.ID,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART.CREATED_AT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART.UPDATED_AT,
        allowNull: false,
      },
    },
    modelConfig
  );
}

function initAssociations(): void {
  Cart.belongsTo(User, {
    as: "user",
    foreignKey: DATABASE_COLUMNS.CART.USER_ID,
  });
}
