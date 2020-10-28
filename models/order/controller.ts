import { CheckoutEntity } from "./entiities/checkout";

class OrderController {
  public async checkoutUsersCart(req, res) {
    return CheckoutEntity.checkoutUser(req, res);
  }
}

const orderController = new OrderController();
Object.freeze(orderController);
export { orderController as OrderController };
