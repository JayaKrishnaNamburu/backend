import { CatgoriesRepository } from "./repository";

class CategoriesController {
  public async fetchCategories() {
    return CatgoriesRepository.get();
  }

  public async addCategory(name: string) {
    return CatgoriesRepository.add({ name });
  }
}

const categoriesController = new CategoriesController();
Object.freeze(categoriesController);
export { categoriesController as CategoriesController };
