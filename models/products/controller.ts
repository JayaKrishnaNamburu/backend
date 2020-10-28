import { ForeignKeyConstraintError } from "sequelize";
import { DATABASE_COLUMNS } from "../../utils/constants";
import { ProductsRepository } from "./repository";

class ProductsController {
  public async getProductsByCategory(req, res) {
    try {
      const result = await ProductsRepository.getProductsByCategory(
        String(req.params.category_id).trim()
      );
      return res.status(200).json(result).end();
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }

  public async addProduct(req, res) {
    if (req.user && req.user.id_admin) {
      return res.status(401).json().end();
    }

    try {
      const {
        name,
        price,
        quantity,
        description,
        short_description,
        image,
        category_id,
      } = req.body;

      await ProductsRepository.add({
        [DATABASE_COLUMNS.PRODUCTS.NAME]: name,
        [DATABASE_COLUMNS.PRODUCTS.PRICE]: price,
        [DATABASE_COLUMNS.PRODUCTS.QUANTITY]: quantity,
        [DATABASE_COLUMNS.PRODUCTS.DESCRIPTION]: description,
        [DATABASE_COLUMNS.PRODUCTS.SHORT_DESCRIPTION]: short_description,
        [DATABASE_COLUMNS.PRODUCTS.IMAGE]: image,
        [DATABASE_COLUMNS.PRODUCTS.CATEGORY_ID]: category_id,
      });
      return res.status(200).end();
    } catch (e) {
      console.log(e);

      if (e instanceof ForeignKeyConstraintError) {
        return res.status(400).end();
      }

      return res.status(500).end();
    }
  }
}

const productsController = new ProductsController();
Object.freeze(productsController);
export { productsController as ProductsController };
