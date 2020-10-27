import { DATABASE_COLUMNS } from "../../utils/constants";
import { Cart } from "./entity";
import { v4 } from "uuid";
import { CartItems } from "../cart-items/entity";
import { Products } from "../products/entity";
import { Categories } from "../category/entity";

class CartRepository {
  public async getByUser(user_id: string): Promise<[Cart, boolean]> {
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

  public async getProductsInCart(cart_id: string) {
    return Cart.findByPk(cart_id, {
      include: [
        {
          model: CartItems,
          as: "items",
          attributes: [
            DATABASE_COLUMNS.CART_ITEMS.ID,
            DATABASE_COLUMNS.CART_ITEMS.COUNT,
            DATABASE_COLUMNS.CART_ITEMS.ID,
            DATABASE_COLUMNS.CART_ITEMS.UPDATED_AT,
          ],
          where: { [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: cart_id },
          include: [
            {
              model: Products,
              as: "product",
              include: [
                {
                  model: Categories,
                  as: "category",
                  attributes: [
                    DATABASE_COLUMNS.CATEGORIES.ID,
                    DATABASE_COLUMNS.CATEGORIES.NAME,
                  ],
                },
              ],
              attributes: [
                DATABASE_COLUMNS.PRODUCTS.ID,
                DATABASE_COLUMNS.PRODUCTS.NAME,
                DATABASE_COLUMNS.PRODUCTS.UPDATED_AT,
                DATABASE_COLUMNS.PRODUCTS.PRICE,
                DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION,
                DATABASE_COLUMNS.PRODUCTS.IMAGE,
              ],
            },
          ],
        },
      ],
      attributes: [DATABASE_COLUMNS.CART.ID, DATABASE_COLUMNS.CART.UPDATED_AT],
    });
  }
}

const cartRepository = new CartRepository();
Object.freeze(cartRepository);
export { cartRepository as CartRepository };
