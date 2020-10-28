import { Transaction } from "sequelize";
import { v4 } from "uuid";
import { DatabaseConnection } from "../../../database";
import { DATABASE_COLUMNS } from "../../../utils/constants";
import { CartItems } from "../../cart-items/entity";
import { OrderItems } from "../../order-items/entity";
import { Products } from "../../products/entity";
import { Order } from "../entity";

class CheckoutEntity {
  public async checkoutUser(req, res) {
    const {
      id: user_id,
      cart: { id: cart_id },
    } = req.user;

    if (!cart_id || !user_id) {
      res.status(403).end();
    }

    const transaction = await DatabaseConnection.getInstance().transaction();

    try {
      const cartItems = await CartItems.findAll({
        where: { [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: cart_id },
        include: { model: Products, as: "product" },
        transaction,
      });

      if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ error: "No items in cart to checkout" }).end();
        transaction.rollback();
      }

      let total_amount = 0;

      // Creating a order entry
      const order_id = v4();
      const order = await Order.create(
        {
          [DATABASE_COLUMNS.ORDER.ID]: order_id,
          [DATABASE_COLUMNS.ORDER.USER_ID]: user_id,
        },
        { transaction }
      );
      const orderEntries = [];
      // TODO: write types for this responses
      for (const productEntry of cartItems) {
        // @ts-ignore
        const { id, product, count: countFromCart } = productEntry;
        const {
          quantity: productsAvaiable,
          name,
          price,
          id: product_id,
        } = product.toJSON();

        if (countFromCart > productsAvaiable) {
          throw new Error(
            `Requested ${countFromCart}(s) of ${name}, are not available, only ${productsAvaiable} in stock`
          );
        }

        orderEntries.push({
          [DATABASE_COLUMNS.ORDER_ITEMS.ID]: v4(),
          [DATABASE_COLUMNS.ORDER_ITEMS.ORDER_ID]: order_id,
          [DATABASE_COLUMNS.ORDER_ITEMS.PRODUCT_ID]: product_id,
          [DATABASE_COLUMNS.ORDER_ITEMS.QUANTITY]: countFromCart,
          [DATABASE_COLUMNS.ORDER_ITEMS.PRICE]: Math.floor(
            price * countFromCart
          ),
        });

        // Decreasing the product quantity count
        const productFROMDB = await Products.findByPk(product_id, {
          lock: Transaction.LOCK.UPDATE,
          transaction,
        });
        await productFROMDB.decrement(
          {
            [DATABASE_COLUMNS.PRODUCTS.QUANTITY]: countFromCart,
          },
          { transaction }
        );

        total_amount = Math.floor(total_amount + price * countFromCart);
      }

      // Updating th total amount
      await order.update(
        {
          [DATABASE_COLUMNS.ORDER.TOTAL_PRICE]: total_amount,
        },
        { transaction }
      );

      // Bulk Creating the entries for all the products from cart
      await OrderItems.bulkCreate(orderEntries, { transaction });

      // Bulk delete of all cart items
      await CartItems.destroy({
        where: {
          [DATABASE_COLUMNS.CART_ITEMS.CART_ID]: cart_id,
        },
        transaction,
      });

      transaction.commit();
      res.status(200).end();
    } catch (e) {
      transaction.rollback();
      res
        .status(500)
        .json({ error: e.message ? e.message : "Failed in placed order" })
        .end();
    }
  }
}

const checkoutEntity = new CheckoutEntity();
Object.freeze(checkoutEntity);
export { checkoutEntity as CheckoutEntity };
