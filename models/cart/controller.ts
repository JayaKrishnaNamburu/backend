import { ForeignKeyConstraintError } from "sequelize";
import { CartItemsRepository } from "../cart-items/repository";
import { CartRepository } from "./repository";

class CartController {
  public async addToCart() {}

  public async getUsersCart(req, res) {
    const { id } = req.user;
    try {
      const result = await CartRepository.getByUser(id);
      if (result[0]) {
        // TODO: fetch all the product details and counts and send back, not just cart id
        res.status(200).json(result[0]).end();
      }

      if (!result) {
        res.status(500).end();
      }
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }

  public async addProductToCart(req, res) {
    const { id: user_id } = req.user;
    const { product_id } = req.params;
    // Product validation is done by PSQL DB, since we have relation constraint with product_id
    const cartOfUser = await CartRepository.getByUser(user_id);
    if (cartOfUser.length !== 2) {
      res.status(400).end();
    }
    try {
      const { id: cart_id } = cartOfUser[0].toJSON() as {
        id: string;
        user_id: string;
      };

      const productExists = await CartItemsRepository.isSameProductExists({
        cart_id,
        product_id,
      });
      if (productExists && productExists.toJSON()) {
        await CartItemsRepository.increaseQuantityCountOfTheProduct({
          cart_id,
          product_id,
        });
        res.status(200).end();
      } else {
        const result = await CartItemsRepository.add({
          cart_id,
          product_id,
          count: 1,
        });
        if (result) {
          return res.status(200).end();
        }
        if (!result) {
          return res.status(400).end();
        }
      }
    } catch (e) {
      console.log(e);

      if (e instanceof ForeignKeyConstraintError) {
        return res.status(400).end();
      }

      return res.status(500).end();
    }
  }
}

const cartController = new CartController();
Object.freeze(cartController);
export { cartController as CartController };
