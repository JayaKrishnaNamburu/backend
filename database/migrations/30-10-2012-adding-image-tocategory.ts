import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn(DATABASE_MODELS.CATEGORIES, "image", {
      type: DataTypes.STRING,
      allowNull: true,
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
    await query.removeColumn(DATABASE_MODELS.CATEGORIES, "image");
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
