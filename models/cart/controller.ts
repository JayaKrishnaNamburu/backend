import { ForeignKeyConstraintError } from "sequelize";
import { CartItemsRepository } from "../cart-items/repository";
import { CartRepository } from "./repository";

class CartController {
  public async getUsersCart(req, res) {
    try {
      const { id: user_id } = req.user;

      const [cart] = await CartRepository.getByUser(user_id);
      const { id: cart_id } = cart.toJSON() as { id: string; user_id: string };

      const cartItems = await CartRepository.getProductsInCart(cart_id);
      return res
        .status(200)
        .json(cartItems || {})
        .end();
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }

  public async removProductFromCart(req, res) {
    const {
      cart: { id: cart_id },
    } = req.user;

    const { product_id } = req.params;

    try {
      await CartItemsRepository.remove({ cart_id, product_id });
      res.status(200).end();
    } catch (e) {
      res.status(500).end();
    }
  }

  public async addProductToCart(req, res) {
    const {
      cart: { id: cart_id },
    } = req.user;

    const { product_id } = req.params;
    try {
      const result = await CartItemsRepository.increaseQuantityCountOfTheProduct(
        {
          cart_id,
          product_id,
        }
      );

      if (result[0] === 1) {
        return res.status(200).end();
      }

      const resultAfterAdding = await CartItemsRepository.add({
        cart_id,
        product_id,
        count: 1,
      });
      if (resultAfterAdding) {
        return res.status(200).end();
      } else {
        return res.status(400).end();
      }
    } catch (e) {
      console.log(e);

      /* Product validation is done by PSQL DB, 
    since we have relation constraint with product_id */
      if (e instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: "Invalid product id" }).end();
      }

      return res.status(500).end();
    }
  }
}

const cartController = new CartController();
Object.freeze(cartController);
export { cartController as CartController };
