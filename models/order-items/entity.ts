import { DataTypes, Model } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { Order } from "../order/entity";
import { Products } from "../products/entity";

export class OrderItems extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel() {
  const modelConfig = getModelConfig(DATABASE_MODELS.ORDER_ITEMS);

  OrderItems.init(
    {
      [DATABASE_COLUMNS.ORDER_ITEMS.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      [DATABASE_COLUMNS.ORDER_ITEMS.ORDER_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.ORDERS,
          key: DATABASE_COLUMNS.ORDER.ID,
        },
      },
      [DATABASE_COLUMNS.ORDER_ITEMS.PRODUCT_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.PRODUCTS,
          key: DATABASE_COLUMNS.PRODUCTS.ID,
        },
      },
      [DATABASE_COLUMNS.ORDER_ITEMS.QUANTITY]: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      [DATABASE_COLUMNS.ORDER_ITEMS.PRICE]: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.ORDER_ITEMS.CREATED_AT,
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

function initAssociations() {
  OrderItems.belongsTo(Order, {
    as: "meta",
    foreignKey: DATABASE_COLUMNS.ORDER.ID,
  });

  OrderItems.belongsTo(Products, {
    as: "product",
    foreignKey: DATABASE_COLUMNS.PRODUCTS.ID,
  });
}
