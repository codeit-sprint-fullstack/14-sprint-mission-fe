import {
  createProduct as createProductService,
  getProducts as getProductsService,
} from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const product = await createProductService(req.body, req.auth.userId);

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function getProducts(req, res, next) {
  try {
    const result = await getProductsService(req.query);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
