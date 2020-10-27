import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.createTable(
      DATABASE_MODELS.CART_ITEMS,
      {
        [DATABASE_COLUMNS.CART.ID]: {
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
      { transaction }
    );

    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}

export async function down(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();
  try {
    await query.dropTable(DATABASE_MODELS.CART_ITEMS, { transaction });
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
