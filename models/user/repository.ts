import { v4 as uuidV4 } from "uuid";
import { User } from "./entity";
class UserRepository {
  public getUser(id: string): Promise<User> {
    return User.findByPk(id);
  }

  public getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public async createUser(
    name: string,
    email: string,
    passwordDigest: string,
    phone: string,
    zone?: string
  ): Promise<User> {
    return User.create({
      id: uuidV4(),
      name,
      email,
      passwordDigest,
      phone,
      zone,
    });
  }

  public async getUserWithEmail(email: string) {
    return User.findOne({
      attributes: ["name", "email", "id", "phone"],
      where: {
        email,
      },
    });
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
