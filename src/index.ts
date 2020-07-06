import express from "express";
import bodyParser from "body-parser";

import { DatabaseConnection } from "../database";

import { signUp } from '../domain/auth'
import { getAllUsers } from '../domain/user'

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

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.post('/signup', signUp)
app.get('/users', getAllUsers)

if (process.env.NODE_ENV !== "production") {
  app.listen(port, async () => {

    DatabaseConnection.getInstance().authenticate()
    .then(() => console.log('Database connection successful'))
    .catch((e) => {
      console.log(`Database connection failed`)
      console.error(e)
    })

    try {
      await DatabaseConnection.initializeModels();
    } catch (e) {
      console.error(e);
    }
  });
}

export { app };
