import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.DESCRIPTION,
      {
        type: DataTypes.STRING(500),
        defaultValue: null,
        allowNull: true,
      }
    );

    await query.addColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION,
      {
        type: DataTypes.STRING(150),
        allowNull: true,
        defaultValue: null,
      }
    );

    await query.addColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.PRICE,
      {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      }
    );

    await query.addColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.QUANTITY,
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );

    await query.addColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.IMAGE,
      {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      }
    );
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}

export async function down(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();
  try {
    await query.removeColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.DESCRIPTION
    );
    await query.removeColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION
    );
    await query.removeColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.PRICE
    );
    await query.removeColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.QUANTITY
    );
    await query.removeColumn(
      DATABASE_MODELS.PRODUCTS,
      DATABASE_COLUMNS.PRODUCTS.IMAGE
    );
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
