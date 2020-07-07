import { SignUp } from "./types";
import { UserController } from "../../models/user/controller";

export const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    phone,
    zone,
  } = req.body as SignUp;
  try {
    const result = await UserController.createUser(
      name,
      email,
      password,
      passwordConfirmation,
      phone,
      zone
    );
    const user = result.toJSON();
    delete user["passwordDigest"];
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: `Failed in creating user` });
  }
};

export const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await UserController.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(401).end();
  }
};
