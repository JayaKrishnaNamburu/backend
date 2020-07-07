import UmzugClass, { Umzug } from "umzug";
import path from "path";
import { DatabaseConnection } from ".";

class DatabaseMigrator {
  private umzug: Umzug;

  constructor() {
    if (this.umzug) {
      throw new Error("Migrator already initialized");
    }

    const sequelize = DatabaseConnection.getInstance();
    this.umzug = new UmzugClass({
      logging: (logs) => {
        // eslint-disable-next-line no-console
        console.log(logs);
      },
      migrations: {
        path: path.join(__dirname, "./migrations"),
        params: [sequelize.getQueryInterface()],
        pattern: /\.ts$/,
      },
      storage: "sequelize",
      storageOptions: { sequelize },
    });
  }

  public async migrateChanges() {
    await this.umzug.up();
  }

  public async revertLastMigration() {
    await this.umzug.down();
  }

  public async revertAllMigrations() {
    await this.umzug.down({ to: 0 });
  }

  public async revertUntillMigrationName(migration: string) {
    await this.umzug.down({ to: migration });
  }
}

const migratorInstance = new DatabaseMigrator();
Object.freeze(migratorInstance);
export { migratorInstance as DatabaseMigrator };
