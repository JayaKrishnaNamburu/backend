import { CartItems } from "./entity";
import { v4 } from "uuid";
import { DATABASE_COLUMNS } from "../../utils/constants";
import { Sequelize } from "sequelize";

class CartItemsRepository {
  public async add(params: {
    cart_id: string;
    product_id: string;
    count: number;
  }) {
    return CartItems.create({
      id: v4(),
      ...params,
    });
  }

  public async isSameProductExists(params: {
    cart_id: string;
    product_id: string;
  }) {
    return CartItems.findOne({
      where: {
        [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: params.cart_id,
        [DATABASE_COLUMNS.CART_ITEMS.PRODUCT_ID]: params.product_id,
      },
    });
  }

  public async increaseQuantityCountOfTheProduct(params: {
    cart_id: string;
    product_id: string;
  }) {
    return CartItems.update(
      { [DATABASE_COLUMNS.CART_ITEMS.COUNT]: Sequelize.literal("count + 1") },
      {
        where: {
          [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: params.cart_id,
          [DATABASE_COLUMNS.CART_ITEMS.PRODUCT_ID]: params.product_id,
        },
      }
    );
  }
}

const cartItemsRepository = new CartItemsRepository();
Object.freeze(cartItemsRepository);
export { cartItemsRepository as CartItemsRepository };
