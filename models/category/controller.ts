import { CatgoriesRepository } from "./repository";

class CategoriesController {
  public async fetchCategories() {
    return CatgoriesRepository.getCategores();
  }
}

const categoriesController = new CategoriesController();
Object.freeze(categoriesController);
export { categoriesController as CategoriesController };
