require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "./repository";
import { User } from "../user/entity";

class UserController {
  public async createUser(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    phone: string,
    zone?: string
  ): Promise<User> {
    if (password !== passwordConfirmation) {
      throw new Error(`Password and confirm password doesn't match`);
    }
    const hash = bcrypt.hashSync(password, 10);
    return UserRepository.createUser(name, email, hash, phone, zone);
  }

  public fetUserAfterJWTToeknAuthentication(email: string): Promise<User> {
    return UserRepository.getUserWithEmail(email);
  }

  public async authenticateUser(email: string, password: string) {
    const hash = await (
      await UserRepository.getUserPasswordHashByEmail(email)
    ).toJSON();
    const isValidPassword = bcrypt.compareSync(password, hash.passwordDigest);
    if (!isValidPassword) {
      return Promise.reject(new Error("Password hash did not match !!"));
    }
    if (!process.env.JWT_SECRET) {
      return Promise.reject(new Error("JWT missing!!"));
    }
    const token = jwt.sign(email, process.env.JWT_SECRET);
    return Promise.resolve({ key: token });
  }
}

const userController = new UserController();
Object.freeze(userController);
export { userController as UserController };
