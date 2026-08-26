import {
  createProduct,
  getProductById,
  getProducts,
} from "../services/productService.js";

export async function getProductsController(req, res, next) {
  try {
    const { page, pageSize, keyword, orderBy } = req.query;
    const userId = req.user?.userId;

    const result = await getProducts({
      page,
      pageSize,
      keyword,
      orderBy,
      userId,
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function createProductController(req, res, next) {
  try {
    const { name, description, price, tags, images } = req.body;
    const ownerId = req.user.userId;

    const product = await createProduct({
      name,
      description,
      price,
      tags,
      images,
      ownerId,
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function getProductController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const product = await getProductById(id, userId);

    return res.json(product);
  } catch (error) {
    return next(error);
  }
}
