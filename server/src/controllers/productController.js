import {
  addProductLike,
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  removeProductLike,
  updateProduct,
} from "../services/productService.js";

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
}

function toOptionalArray(value) {
  if (value === undefined) {
    return undefined;
  }

  return toArray(value);
}

function getUploadedImagePaths(files) {
  return (files ?? []).map((file) => `/uploads/products/${file.filename}`);
}

export async function getProductsController(req, res) {
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
}

export async function createProductController(req, res) {
  const { name, description, price, tags } = req.body;

  const tagList = toArray(tags);
  const images = getUploadedImagePaths(req.files);

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
}

export async function getProductController(req, res) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const product = await getProductById(id, userId);

  return res.json(product);
}

export async function updateProductController(req, res) {
  const { id } = req.params;
  const { name, description, price, tags, images } = req.body;
  const userId = req.user.userId;

  const tagList = toOptionalArray(tags);
  const existingImages = toOptionalArray(images);
  const uploadedImages = getUploadedImagePaths(req.files);

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
}

export async function deleteProductController(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  await deleteProduct(id, userId);

  return res.sendStatus(204);
}

export async function addProductLikeController(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  const result = await addProductLike(productId, userId);

  return res.json(result);
}

export async function removeProductLikeController(req, res) {
  const { productId } = req.params;
  const userId = req.user.userId;

  const result = await removeProductLike(productId, userId);

  return res.json(result);
}
