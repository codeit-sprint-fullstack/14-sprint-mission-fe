import { createProduct as createProductService } from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const product = await createProductService(req.body, req.auth.userId);

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}
