import {} from "sequelize";
import { Options } from "sequelize";
require("dotenv").config();

const {
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_SERVER,
} = process.env;

export const DATABASE_CONFIG: Options = {
  database: DATABASE,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_SERVER,
  logging: console.log,
  dialect: "postgres",
  dialectOptions: {
    connectionTimeout: 30000,
  },
};
