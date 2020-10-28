import { DatabaseMigrator } from "../database/migrator";

const run = async () => {
  try {
    console.log("------Reverting all Migrations--------");
    await DatabaseMigrator.revertLastMigration();
    console.log("-----Reverted last Completed-----------");
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

run();
