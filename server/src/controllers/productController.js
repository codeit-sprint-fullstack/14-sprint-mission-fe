import {
  addProductLike,
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  removeProductLike,
  updateProduct,
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
    const { name, description, price, tags } = req.body;

    const tagList = Array.isArray(tags) ? tags : tags ? [tags] : [];

    const images = (req.files ?? []).map(
      (file) => `/uploads/products/${file.filename}`,
    );

    const ownerId = req.user.userId;

    const product = await createProduct({
      name,
      description,
      price,
      tags: tagList,
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

export async function updateProductController(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price, tags, images } = req.body;
    const userId = req.user.userId;

    const tagList =
      tags === undefined
        ? undefined
        : Array.isArray(tags)
          ? tags
          : tags
            ? [tags]
            : [];

    const existingImages =
      images === undefined
        ? undefined
        : Array.isArray(images)
          ? images
          : images
            ? [images]
            : [];

    const uploadedImages = (req.files ?? []).map(
      (file) => `/uploads/products/${file.filename}`,
    );

    const imageList =
      existingImages === undefined && uploadedImages.length === 0
        ? undefined
        : [...(existingImages ?? []), ...uploadedImages];

    const product = await updateProduct({
      id,
      userId,
      name,
      description,
      price,
      tags: tagList,
      images: imageList,
      existingImages,
    });

    return res.json(product);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProductController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await deleteProduct(id, userId);

    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

export async function addProductLikeController(req, res, next) {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const result = await addProductLike(productId, userId);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function removeProductLikeController(req, res, next) {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const result = await removeProductLike(productId, userId);

    return res.json(result);
  } catch (error) {
    return next(error);
  }
}
