import { DATABASE_COLUMNS } from "../../utils/constants";
import { Cart } from "./entity";
import { v4 } from "uuid";

class CartRepository {
  public async getByUser(user_id: string) {
    return Cart.findOrCreate({
      defaults: {
        [DATABASE_COLUMNS.CART.ID]: v4(),
        [DATABASE_COLUMNS.CART.USER_ID]: user_id,
      },
      where: {
        [DATABASE_COLUMNS.CART.USER_ID]: user_id,
      },
    });
  }
}

const cartRepository = new CartRepository();
Object.freeze(cartRepository);
export { cartRepository as CartRepository };
