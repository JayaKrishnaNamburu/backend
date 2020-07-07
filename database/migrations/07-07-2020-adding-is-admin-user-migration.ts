import { QueryInterface, DataTypes } from "sequelize";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.addColumn(
      "users",
      'isAdmin',
      {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
    await query.removeColumn('users', 'isAdmin');
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
