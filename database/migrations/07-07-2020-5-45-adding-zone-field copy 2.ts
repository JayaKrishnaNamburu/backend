import { QueryInterface, DataTypes } from "sequelize";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn("users", "zone", {
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
    await query.removeColumn("users", "zone");
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
