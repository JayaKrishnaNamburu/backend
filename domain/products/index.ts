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
