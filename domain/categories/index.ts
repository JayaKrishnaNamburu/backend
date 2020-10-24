import { CategoriesController } from "../../models/category/controller";

export const getCategories = async (_, res) => {
  const categories = await CategoriesController.fetchCategories();
  res.status(200).json(categories).end();
};

export const addCategory = async (req, res) => {
  const { is_admin } = req.user;
  if (!is_admin) {
    return res.status(401).end();
  }

  const { category_name } = req.body;
  if (!category_name) {
    return res.status(400).end();
  }

  try {
    await CategoriesController.addCategory(category_name);
    return res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};
