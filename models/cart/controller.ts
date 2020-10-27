import { CartRepository } from "./repository";

class CartController {
  public async addToCart() {}

  public async getUsersCart(req, res) {
    const { id } = req.user;
    try {
      const result = await CartRepository.getByUser(id);
      if (result[0]) {
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
}

const cartController = new CartController();
Object.freeze(cartController);
export { cartController as CartController };
