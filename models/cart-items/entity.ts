import { Model, DataTypes } from "sequelize";
import { DATABASE_MODELS, DATABASE_COLUMNS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { Cart } from "../cart/entity";
import { Products } from "../products/entity";

export class CartItems extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.CART_ITEMS);
  CartItems.init(
    {
      [DATABASE_COLUMNS.CART_ITEMS.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.CART,
          key: DATABASE_COLUMNS.CART.ID,
        },
      },
      [DATABASE_COLUMNS.CART_ITEMS.PRODUCT_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.PRODUCTS,
          key: DATABASE_COLUMNS.PRODUCTS.ID,
        },
      },
      // TODO: Replace count with quantity, easy to understand
      [DATABASE_COLUMNS.CART_ITEMS.COUNT]: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART_ITEMS.CREATED_AT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART_ITEMS.UPDATED_AT,
        allowNull: false,
      },
    },
    modelConfig
  );
}

function initAssociations(): void {
  CartItems.belongsTo(Cart, {
    as: "cartToItem",
    foreignKey: DATABASE_COLUMNS.CART_ITEMS.CART_ID,
  });

  CartItems.belongsTo(Products, {
    as: "cartToProduct",
    foreignKey: DATABASE_COLUMNS.CART_ITEMS.PRODUCT_ID,
  });
}
