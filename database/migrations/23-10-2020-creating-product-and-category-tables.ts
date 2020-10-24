import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.createTable(
      DATABASE_MODELS.CATEGORIES,
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
      },
      { transaction }
    );

    await query.createTable(
      DATABASE_MODELS.PRODUCTS,
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
        category_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      { transaction }
    );

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
}

export async function down(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();
  try {
    await query.dropTable(DATABASE_MODELS.CATEGORIES, { transaction });
    await query.dropTable(DATABASE_MODELS.PRODUCTS, { transaction });
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
