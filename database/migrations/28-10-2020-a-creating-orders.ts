import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.createTable(
      DATABASE_MODELS.ORDERS,
      {
        [DATABASE_COLUMNS.ORDER.ID]: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        [DATABASE_COLUMNS.ORDER.USER_ID]: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: DATABASE_MODELS.USERS,
            key: DATABASE_COLUMNS.USERS.ID,
          },
        },
        [DATABASE_COLUMNS.ORDER.TOTAL_PRICE]: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          field: DATABASE_COLUMNS.ORDER.CREATED_AT,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: DATABASE_COLUMNS.ORDER.UPDATED_AT,
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
    await query.dropTable(DATABASE_MODELS.ORDERS, { transaction });
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
