import { UsersController } from "../user/controller";
import { SignUp } from "./types";

class AuthController {
  public async signUp(req, res) {
    const {
      name,
      email,
      password,
      confirm_password,
      phone,
    } = req.body as SignUp;

    if (password !== confirm_password) {
      return res.status(400).json({
        error: "password and password-confirmation fields don't match ",
      });
    }

    try {
      const result = await UsersController.createUser(
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
  }

  public async login(req, res) {
    const { email, password } = req.body;

    try {
      const result = await UsersController.authenticateUser(email, password);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(401).end();
    }
  }
}

const authController = new AuthController();
Object.freeze(authController);
export { authController as AuthController };
