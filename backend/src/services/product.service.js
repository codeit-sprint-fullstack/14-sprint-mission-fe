import productRepository from "../repositories/product.repository.js";

function formatProduct(product) {
  return {
    ...product,
    images: product.images.map((image) => image.path),
  };
}

export async function createProduct(productData, userId) {
  const createdProduct = await productRepository.save({
    ...productData,
    userId,
  });

  return formatProduct(createdProduct);
}
