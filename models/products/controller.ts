import { ProductsRepository } from "./repository";

class ProductsController {
  public async addCategory(params) {
    return ProductsRepository.add(params);
  }
}

const productsController = new ProductsController();
Object.freeze(productsController);
export { productsController as ProductsController };
