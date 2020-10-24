import { ProductsRepository } from "./repository";

class ProductsController {
  public async addCategory(name: string, category_id: string) {
    return ProductsRepository.add({ name, category_id });
  }
}

const productsController = new ProductsController();
Object.freeze(productsController);
export { productsController as ProductsController };
