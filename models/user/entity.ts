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
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
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
      },
    },
    modelConfig
  );
  User.sync({ force: true})
}

