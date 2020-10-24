import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn(DATABASE_MODELS.CATEGORIES, "created_at", {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
    });

    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }

  try {
    await query.addColumn(DATABASE_MODELS.CATEGORIES, "updated_at", {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
    });

    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }

  try {
    await query.addColumn(DATABASE_MODELS.PRODUCTS, "created_at", {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
    });

    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }

  try {
    await query.addColumn(DATABASE_MODELS.PRODUCTS, "updated_at", {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
    });

    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}

export async function down(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();
  try {
    await query.removeColumn(DATABASE_MODELS.CATEGORIES, "created_at");
    await query.removeColumn(DATABASE_MODELS.CATEGORIES, "updated_at");

    await query.removeColumn(DATABASE_MODELS.PRODUCTS, "created_at");
    await query.removeColumn(DATABASE_MODELS.PRODUCTS, "updated_at");
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
