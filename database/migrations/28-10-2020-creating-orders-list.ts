import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.createTable(
      DATABASE_MODELS.ORDER_ITEMS,
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
    await query.dropTable(DATABASE_MODELS.ORDER_ITEMS, { transaction });
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
