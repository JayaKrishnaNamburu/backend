import { CategoriesController } from "../../models/category/controller";
import { ProductsController } from "../../models/products/controller";
import { ProductsRepository } from "../../models/products/repository";

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

    const result = await ProductsController.addCategory(
      req.body.name,
      req.body.category_id
    );
    return res.status(200).json(result).end();
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};
