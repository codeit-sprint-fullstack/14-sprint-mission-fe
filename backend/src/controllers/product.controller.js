import {
  createProduct as createProductService,
  getProduct as getProductService,
  getProducts as getProductsService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const product = await createProductService(req.body, req.auth.userId);

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await getProductService(req.params.productId);

    return res.status(200).json(product);
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

export async function updateProduct(req, res, next) {
  try {
    const product = await updateProductService(
      req.params.productId,
      req.body,
      req.auth.userId,
    );

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    await deleteProductService(req.params.productId, req.auth.userId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
