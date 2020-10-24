import { Model, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";
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
    },
    modelConfig
  );
}

function initAssocations(): void {
  Products.belongsTo(Categories, {
    as: "category",
    foreignKey: "category_id",
    onDelete: "cascade",
  });
}
