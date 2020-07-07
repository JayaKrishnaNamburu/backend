import { Model, DataTypes } from "sequelize";
import { getModelConfig } from "../../utils/database";

export class User extends Model {
  static initModel = initModel;
}

function initModel(): void {
  const modelConfig = getModelConfig("users");
  User.init(
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
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      }
    },
    modelConfig
  );
}
