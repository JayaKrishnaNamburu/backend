import { SignUp } from "./types";

import { UserController } from "../../models/user/controller";

export const signUp = async (req, res) => {
  const { name, email } = req.body as SignUp;
  try {
    await UserController.createUser(name, email);
    res.status(200).json({ name, email });
  } catch (e) {
    console.log(e);
    res.send("Failed");
  }
};
