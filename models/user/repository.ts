import { v4 as uuidV4 } from "uuid";
import { User } from "./entity";
class UserRepository {
  public getUser(id: string): Promise<User> {
    return User.findByPk(id);
  }

  public getAllUsers(): Promise<User[]> {
    return User.findAll({ attributes: ["email", "name", "id", "phone"] });
  }

  public async createUser(params: {
    name: string;
    email: string;
    passwordDigest: string;
    phone: string;
    zone?: string;
  }): Promise<User> {
    return User.create({
      id: uuidV4(),
      ...params,
    });
  }

  public async getUserWithEmail(email: string) {
    try {
      const user = User.findOne({
        attributes: ["name", "email", "id", "phone", "isAdmin"],
        where: {
          email,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getUserPasswordHashByEmail(email: string): Promise<any> {
    return User.findOne({
      attributes: ["passwordDigest"],
      where: {
        email,
      },
    });
  }
}

const userRepository = new UserRepository();
Object.freeze(userRepository);
export { userRepository as UserRepository };
