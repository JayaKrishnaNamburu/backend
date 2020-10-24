import { SignUp } from "./types";
import { UserController } from "../../models/user/controller";

export const signUp = async (req, res) => {
  const { name, email, password, confirm_password, phone } = req.body as SignUp;

  if (password !== confirm_password) {
    return res.status(400).json({
      error: "password and password-confirmation fields don't match ",
    });
  }

  try {
    const result = await UserController.createUser(
      name,
      email,
      password,
      phone
    );

    if (result.toJSON()) {
      return res.status(200).end();
    }
    return res.status(500).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: `Failed in creating user` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await UserController.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(401).end();
  }
};
