import { DATABASE_COLUMNS } from "../../utils/constants";
import { Cart } from "./entity";

class CartRepository {
  public async getByUser(user_id: string) {
    return Cart.findOne({
      where: { [DATABASE_COLUMNS.CART.USER_ID]: user_id },
    });
  }
}

const cartRepository = new CartRepository();
Object.freeze(cartRepository);
export { cartRepository as CartRepository };
