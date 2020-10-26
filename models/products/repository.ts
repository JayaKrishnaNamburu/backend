import { v4 as uuidV4 } from "uuid";
import { DATABASE_COLUMNS } from "../../utils/constants";
import { Categories } from "../category/entity";
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
      include: [
        {
          model: Categories,
          as: "category",
          where: { id: category_id },
          attributes: [DATABASE_COLUMNS.CATEGORIES.NAME],
        },
      ],
      where: { category_id },
      attributes: [
        DATABASE_COLUMNS.PRODUCTS.ID,
        DATABASE_COLUMNS.PRODUCTS.NAME,
        DATABASE_COLUMNS.PRODUCTS.DESCRIPTION,
        DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION,
        DATABASE_COLUMNS.PRODUCTS.PRICE,
        DATABASE_COLUMNS.PRODUCTS.QUANTITY,
        DATABASE_COLUMNS.PRODUCTS.IMAGE,
      ],
    });
  }
}

const productsRepository = new ProductsRepository();
Object.freeze(productsRepository);
export { productsRepository as ProductsRepository };
