require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "./repository";
import { User } from "../user/entity";

class UsersController {
  public async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      res.json(users).nd();
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Failed in fetching users " }).end();
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string,
    phone: string,
    zone?: string
  ): Promise<User> {
    const hash = bcrypt.hashSync(password, 10);

    return UserRepository.createUser({
      name,
      email,
      password_digest: hash,
      phone,
      zone,
    });
  }

  public fetUserAfterJWTToeknAuthentication(email: string): Promise<User> {
    return UserRepository.getUserWithEmail(email);
  }

  public async authenticateUser(email: string, password: string) {
    try {
      const hash = await (
        await UserRepository.getUserPasswordHashByEmail(email)
      ).toJSON();

      const isValidPassword = bcrypt.compareSync(
        password,
        hash.password_digest
      );

      if (!isValidPassword) {
        return Promise.reject(new Error("Wrong password"));
      }

      if (!process.env.JWT_SECRET) {
        return Promise.reject(new Error("JWT secret missing!!"));
      }

      const token = jwt.sign(
        { email, time: Date.now() },
        process.env.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      );

      return Promise.resolve({ key: token });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

const userController = new UsersController();
Object.freeze(userController);
export { userController as UsersController };
