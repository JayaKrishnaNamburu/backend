import { Model, DataTypes } from "sequelize";
import { DATABASE_COLUMNS, DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";
import { Categories } from "../category/entity";

export class Products extends Model {
  static initModel = initModel;
  static initAssociations = initAssocations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.PRODUCTS);
  Products.init(
    {
      [DATABASE_COLUMNS.PRODUCTS.ID]: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      [DATABASE_COLUMNS.PRODUCTS.NAME]: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      [DATABASE_COLUMNS.PRODUCTS.CATEGORY_ID]: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DATABASE_MODELS.CATEGORIES,
          key: DATABASE_COLUMNS.CATEGORIES.ID,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
      [DATABASE_COLUMNS.PRODUCTS.DESCRIPTION]: {
        type: DataTypes.STRING(500),
        defaultValue: null,
        allowNull: true,
      },
      [DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION]: {
        type: DataTypes.STRING(150),
        allowNull: true,
        defaultValue: true,
      },
      [DATABASE_COLUMNS.PRODUCTS.PRICE]: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      [DATABASE_COLUMNS.PRODUCTS.QUANTITY]: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      [DATABASE_COLUMNS.PRODUCTS.IMAGE]: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    modelConfig
  );
}

function initAssocations(): void {
  Products.belongsTo(Categories, {
    as: "category",
    foreignKey: DATABASE_COLUMNS.PRODUCTS.CATEGORY_ID,
    onDelete: "cascade",
  });
}
