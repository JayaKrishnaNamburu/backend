import { Sequelize } from "sequelize";
import { DATABASE_CONFIG } from "./config";
import { User } from "../models/user/entity";

class DatabaseConnection {
  private sequalize: Sequelize;

  constructor() {
    if (this.sequalize) {
      throw new Error(`Sequalize already initialized`);
    }
    this.sequalize = new Sequelize(DATABASE_CONFIG);
  }

  getInstance() {
    return this.sequalize;
  }

  public initializeModels = async () => {
    const models = [User];
    models.forEach((model) => model.initModel());
  };
}

const instance = new DatabaseConnection();
Object.freeze(instance);
export { instance as DatabaseConnection };
