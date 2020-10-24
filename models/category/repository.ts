import { v4 as uuidV4 } from "uuid";
import { Categories } from "./entity";

class CatgoriesRepository {
  public get() {
    return Categories.findAll({ attributes: ["id", "name"] });
  }

  public add(params: Record<string, string>) {
    return Categories.create({ id: uuidV4(), ...params });
  }

  public exists(category_id: string) {
    return Categories.count({ where: { id: category_id } });
  }
}

const categoriesRepository = new CatgoriesRepository();
Object.freeze(categoriesRepository);
export { categoriesRepository as CatgoriesRepository };
