import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn(DATABASE_MODELS.USERS, "zone", {
      type: DataTypes.STRING,
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
    await query.removeColumn(DATABASE_MODELS.USERS, "zone");
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
