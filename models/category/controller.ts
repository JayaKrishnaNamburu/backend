import { CatgoriesRepository } from "./repository";

class CategoriesController {
  public async fetchCategories() {
    return CatgoriesRepository.get();
  }

  public async addCategory(name: string) {
    return CatgoriesRepository.add({ name });
  }

  public async isCategoryExists(category_id: string) {
    const result = await CatgoriesRepository.exists(category_id);
    return result > 0 ? true : false;
  }
}

const categoriesController = new CategoriesController();
Object.freeze(categoriesController);
export { categoriesController as CategoriesController };
