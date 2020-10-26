import { QueryInterface, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";

export async function up(query: QueryInterface) {
  const transaction = await query.sequelize.transaction();

  try {
    await query.createTable(DATABASE_MODELS.CART, {
      [DATABASE_COLUMNS.CART.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      [DATABASE_COLUMNS.CART.USER_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.USERS,
          key: DATABASE_COLUMNS.USERS.ID,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART.CREATED_AT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: DATABASE_COLUMNS.CART.UPDATED_AT,
        allowNull: false,
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
    await query.dropTable(DATABASE_MODELS.CART, { transaction });
    transaction.commit();
  } catch (e) {
    transaction.rollback();
    throw e;
  }
}
