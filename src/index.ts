// @ts-ignore
import swaggerSpec from "../utils/swagger-docs.json";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import swagger from "swagger-ui-express";
import { DatabaseConnection } from "../database";

import { addCategory, getCategories } from "../domain/categories";
import { signUp, login } from "../domain/auth";
import { getAllUsers } from "../domain/user";

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
require("../passport")(passport);
app.use(passport.initialize());

app.use("/docs", swagger.serve, swagger.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.status(200).send("Server is Running");
});

app.post("/signup", signUp);
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getAllUsers
);
app.post("/login", login);
app.get("/categories", getCategories);
app.put(
  "/add_category",
  passport.authenticate("jwt", { session: false }),
  addCategory
);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, async () => {
    DatabaseConnection.getInstance()
      .authenticate()
      .then(async () => {
        console.log("Database connection successful");
        try {
          console.log("---------Initialising Database--------");
          await DatabaseConnection.initializeModels();
          console.log("---------Database Initialisation successful-------");
        } catch (e) {
          console.error(e);
        }
      })
      .catch((e) => {
        console.log(`Database connection failed`);
        console.error(e);
      });
  });
}

export { app };
