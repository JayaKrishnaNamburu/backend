import { v4 as uuidV4 } from "uuid";
import { DATABASE_COLUMNS } from "../../utils/constants";
import { Cart } from "../cart/entity";
import { User } from "./entity";
class UserRepository {
  public getUser(id: string): Promise<User> {
    return User.findByPk(id, {
      include: [
        {
          model: Cart,
          as: "cart",
          attributes: [DATABASE_COLUMNS.CART.ID],
        },
      ],
    });
  }

  public getAllUsers(): Promise<User[]> {
    return User.findAll({
      attributes: [
        DATABASE_COLUMNS.USERS.EMAIL,
        DATABASE_COLUMNS.USERS.NAME,
        DATABASE_COLUMNS.USERS.ID,
        DATABASE_COLUMNS.USERS.PHONE,
      ],
    });
  }

  public async createUser(params: {
    name: string;
    email: string;
    password_digest: string;
    phone: string;
    zone?: string;
  }): Promise<User> {
    return User.create({
      id: uuidV4(),
      ...params,
    });
  }

  public async getUserPasswordHashByEmail(email: string): Promise<any> {
    return User.findOne({
      attributes: [
        DATABASE_COLUMNS.USERS.ID,
        DATABASE_COLUMNS.USERS.PASSWORD_DIGEST,
      ],
      where: {
        email,
      },
    });
  }
}

const userRepository = new UserRepository();
Object.freeze(userRepository);
export { userRepository as UserRepository };
