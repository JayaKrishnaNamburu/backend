// @ts-ignore
import swaggerSpec from "../utils/swagger-docs.json";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import swagger from "swagger-ui-express";
import { DatabaseConnection } from "../database";

import { addCategory, getCategories } from "../domain/categories";
import { addProduct, getProductsByCategory } from "../domain/products";
import { signUp, login } from "../domain/auth";
import { getAllUsers } from "../domain/user";
import { authChecker } from "../utils/auth-chcker";
import { paramsChecker } from "../utils/params_checker";
import { bodyParamsChecker } from "../utils/body_params_checker";

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

app.post(
  "/signup",
  (req, res, next) =>
    bodyParamsChecker(req, res, next, [
      "email",
      "name",
      "password",
      "confirm_password",
      "phone",
    ]),
  signUp
);
app.get("/categories", getCategories);

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  authChecker,
  getAllUsers
);

app.post(
  "/login",
  (req, res, next) => bodyParamsChecker(req, res, next, ["email", "password"]),
  login
);

app.put(
  "/add_category",
  (req, res, next) => bodyParamsChecker(req, res, next, ["category_name"]),
  passport.authenticate("jwt", { session: false }),
  authChecker,
  addCategory
);

app.get(
  "/products/:category_id",
  (req, res, next) => paramsChecker(req, res, next, ["category_id"]),
  getProductsByCategory
);

app.put(
  "/add_product",
  (req, res, next) => bodyParamsChecker(req, res, next, ["name"]),
  passport.authenticate("jwt", { session: false }),
  authChecker,
  addProduct
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
