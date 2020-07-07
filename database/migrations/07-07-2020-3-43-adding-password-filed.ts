import { QueryInterface, DataTypes } from "sequelize";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn("users", "passwordDigest", {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
    await query.removeColumn("users", "passwordDigest");
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
