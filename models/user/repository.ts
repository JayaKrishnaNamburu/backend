import { v4 as uuidV4 } from "uuid";
import { DATABASE_COLUMNS } from "../../utils/constants";
import { Cart } from "../cart/entity";
import { OrderItems } from "../order-items/entity";
import { Order } from "../order/entity";
import { Products } from "../products/entity";
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

  public getUserDtails(id: string): Promise<User> {
    return User.findByPk(id, {
      attributes: [
        DATABASE_COLUMNS.USERS.ID,
        DATABASE_COLUMNS.USERS.EMAIL,
        DATABASE_COLUMNS.USERS.NAME,
        DATABASE_COLUMNS.USERS.PHONE,
      ],
    });
  }

  public getCart(id: string) {
    return User.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
          attributes: [
            DATABASE_COLUMNS.ORDER.ID,
            DATABASE_COLUMNS.ORDER.TOTAL_PRICE,
            DATABASE_COLUMNS.ORDER.CREATED_AT,
          ],
          include: [
            {
              model: OrderItems,
              as: "items",
              attributes: [
                DATABASE_COLUMNS.ORDER_ITEMS.ID,
                DATABASE_COLUMNS.ORDER_ITEMS.PRICE,
                DATABASE_COLUMNS.ORDER_ITEMS.QUANTITY,
              ],
              include: [
                {
                  model: Products,
                  as: "product",
                  attributes: [
                    DATABASE_COLUMNS.PRODUCTS.ID,
                    DATABASE_COLUMNS.PRODUCTS.NAME,
                    DATABASE_COLUMNS.PRODUCTS.PRICE,
                  ],
                },
              ],
            },
          ],
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
