import { Model, DataTypes } from "sequelize";
import { DATABASE_MODELS } from "../../utils/constants";
import { getModelConfig } from "../../utils/database";

export class Categories extends Model {
  static initModel = initModel;
  static initAssociations = initAssociations;
}

function initModel(): void {
  const modelConfig = getModelConfig(DATABASE_MODELS.CATEGORIES);
  Categories.init(
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
    },
    modelConfig
  );
}

function initAssociations(): void {}
