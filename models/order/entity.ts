import { DataTypes, Model } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { OrderItems } from "../order-items/entity";
import { User } from "../user/entity";

export class Order extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

// TODO: Change DataTypes.UUID to UUIDV4 in all migrations

function initModel() {
  const modelConfig = getModelConfig(DATABASE_MODELS.ORDERS);

  Order.init(
    {
      [DATABASE_COLUMNS.ORDER.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      [DATABASE_COLUMNS.ORDER.USER_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.USERS,
          key: DATABASE_COLUMNS.USERS.ID,
        },
      },
      [DATABASE_COLUMNS.ORDER.TOTAL_PRICE]: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.ORDER.CREATED_AT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.ORDER.UPDATED_AT,
        allowNull: false,
      },
    },
    modelConfig
  );
}

function initAssociations() {
  Order.belongsTo(User, {
    as: "user",
    foreignKey: DATABASE_COLUMNS.USERS.ID,
  });

  Order.hasMany(OrderItems, {
    as: "items",
    foreignKey: DATABASE_COLUMNS.ORDER_ITEMS.ORDER_ID,
  });
}
