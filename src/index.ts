// @ts-ignore
import swaggerSpec from "../utils/swagger-docs.json";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import swagger from "swagger-ui-express";
import { DatabaseConnection } from "../database";

import { UsersController } from "../models/user/controller";
import { ProductsController } from "../models/products/controller";
import { CategoriesController } from "../models/category/controller";
import { AuthController } from "../models/auth/controller";
import { authChecker } from "../utils/auth-chcker";
import { paramsChecker } from "../utils/params_checker";
import { bodyParamsChecker } from "../utils/body_params_checker";
import { DATABASE_COLUMNS } from "../utils/constants";
import { CartController } from "../models/cart/controller";

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
  AuthController.signUp
);
app.get("/categories", CategoriesController.getCategories);

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  authChecker,
  UsersController.getAllUsers
);

app.post(
  "/login",
  (req, res, next) => bodyParamsChecker(req, res, next, ["email", "password"]),
  AuthController.login
);

app.put(
  "/add_category",
  (req, res, next) => bodyParamsChecker(req, res, next, ["category_name"]),
  passport.authenticate("jwt", { session: false }),
  authChecker,
  CategoriesController.addCategory
);

app.get(
  "/products/:category_id",
  (req, res, next) =>
    paramsChecker(req, res, next, [DATABASE_COLUMNS.PRODUCTS.CATEGORY_ID]),
  ProductsController.getProductsByCategory
);

app.put(
  "/add_product",
  (req, res, next) =>
    bodyParamsChecker(req, res, next, [
      DATABASE_COLUMNS.PRODUCTS.CATEGORY_ID,
      DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION,
      DATABASE_COLUMNS.PRODUCTS.PRICE,
      DATABASE_COLUMNS.PRODUCTS.QUANTITY,
      DATABASE_COLUMNS.PRODUCTS.NAME,
    ]),
  passport.authenticate("jwt", { session: false }),
  authChecker,
  ProductsController.addProduct
);

app.delete(
  "/delete_category/:category_id",
  (req, res, next) => paramsChecker(req, res, next, ["category_id"]),
  passport.authenticate("jwt", { session: false }),
  authChecker,
  CategoriesController.deleteCatgory
);

app.get(
  "/cart",
  passport.authenticate("jwt", { session: false }),
  authChecker,
  CartController.getUsersCart
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
