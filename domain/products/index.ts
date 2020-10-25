import { CategoriesController } from "../../models/category/controller";
import { ProductsController } from "../../models/products/controller";
import { ProductsRepository } from "../../models/products/repository";
import { DATABASE_COLUMNS } from "../../utils/constants";

export const getProductsByCategory = async (req, res) => {
  try {
    const result = await ProductsRepository.getProductsByCategory(
      req.params.category_id
    );
    return res.status(200).json(result).end();
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};

export const addProduct = async (req, res) => {
  if (req.user && req.user.id_admin) {
    return res.status(401).json().end();
  }

  try {
    const isValidCategory = await CategoriesController.isCategoryExists(
      req.body.category_id
    );
    if (!isValidCategory) {
      return res.status(400).json({ error: "Invalid catgory" }).end();
    }

    const {
      name,
      price,
      quantity,
      description,
      short_description,
      image,
      category_id,
    } = req.body;

    await ProductsController.addCategory({
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
    return res.status(500).end();
  }
};
