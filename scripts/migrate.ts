import { DatabaseMigrator } from "../database/migrator";

const run = async () => {
  try {
    console.log("------Running all Migrations--------");
    await DatabaseMigrator.migrateChanges();
    console.log("-----Migrations Completed-----------");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

run();
