import { v4 as uuidV4 } from "uuid";
import { Products } from "./entity";

class ProductsRepository {
  public get() {
    return Products.findAll({ attributes: ["id", "name"] });
  }

  public add(params: Record<string, string>) {
    return Products.create({ id: uuidV4(), ...params });
  }

  public getProductsByCategory(category_id: string) {
    return Products.findAll({
      where: { category_id },
      attributes: ["name", "id"],
    });
  }
}

const productsRepository = new ProductsRepository();
Object.freeze(productsRepository);
export { productsRepository as ProductsRepository };
