import { CatgoriesRepository } from "./repository";

class CategoriesController {
  public async getCategories(_, res) {
    const categories = await CatgoriesRepository.get();
    res.status(200).json(categories).end();
  }

  public async addCategory(req, res) {
    const { is_admin } = req.user;
    if (!is_admin) {
      return res.status(401).end();
    }

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).end();
    }

    try {
      await CatgoriesRepository.add({ name: category_name });
      return res.status(200).end();
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }

  public async deleteCatgory(req, res) {
    try {
      const { category_id } = req.params;
      await CatgoriesRepository.remove(category_id);
      res.status(200).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  }
}

const categoriesController = new CategoriesController();
Object.freeze(categoriesController);
export { categoriesController as CategoriesController };
