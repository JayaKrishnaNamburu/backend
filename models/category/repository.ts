import { Categories } from "./entity";

class CatgoriesRepository {
  public getCategores() {
    return Categories.findAll();
  }
}

const categoriesRepository = new CatgoriesRepository();
Object.freeze(categoriesRepository);
export { categoriesRepository as CatgoriesRepository };
