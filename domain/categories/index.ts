import { CategoriesController } from "../../models/category/controller";

export const getCategories = (_, res) => {
  const categories = CategoriesController.fetchCategories();
  res.status(200).json(categories).end();
};

export const addCategory = (req, res) => {
  const { user } = req;
  if (!user || !user.isAdmin) {
    res.status(401).end();
  }
  res.end();
};
