import { CartRepository } from "./repository";

class CartController {
  public async addToCart() {}

  public async getUsersCart(req, res) {
    const { id } = req.user;
    try {
      const result = await CartRepository.getByUser(id);
      console.log(result, "result");
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }
}

const cartController = new CartController();
Object.freeze(cartController);
export { cartController as CartController };
