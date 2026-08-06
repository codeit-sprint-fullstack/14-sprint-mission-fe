import { ElectronicProduct } from './models/ElectronicProduct.js';
import { Product } from './models/Product.js';
import * as ProductService from './services/ProductService.js';
import * as ArticleService from './services/ArticleService.js';

async function getProductListAndInstantiate() {
  const rawProducts = await ProductService.getProductList(1, 20, '');

  const products = [];
  for (const rawProduct of rawProducts) {
    if (rawProduct.tags.includes('전자제품')) {
      products.push(
        new ElectronicProduct(
          rawProduct.name,
          rawProduct.description,
          rawProduct.price,
          rawProduct.tags,
          rawProduct.images,
          rawProduct.favoriteCount,
          rawProduct.manufacturer,
        ),
      );
    } else {
      products.push(
        new Product(
          rawProduct.name,
          rawProduct.description,
          rawProduct.price,
          rawProduct.tags,
          rawProduct.images,
          rawProduct.favoriteCount,
        ),
      );
    }
  }

  console.log(products);
}

async function testProductService() {
  const getProductListResponse = await ProductService.getProductList(1, 20, '');
  const getProductResponse = await ProductService.getProduct(getProductListResponse[0].id);

  const createProductResponse = await ProductService.createProduct(
    '포토카드',
    '액자 포함',
    10000,
    undefined,
    ['소품'],
    ['https://picsum.photos/200/300'],
  );
  const patchProductResponse = await ProductService.patchProduct(
    createProductResponse.id,
    createProductResponse.name,
    '액자 미포함',
    10000,
    createProductResponse.tags,
    createProductResponse.images,
  );
  const deleteProductResponse = await ProductService.deleteProduct(createProductResponse.id);

  console.log(getProductListResponse);
  console.log(getProductResponse);
  console.log(createProductResponse);
  console.log(patchProductResponse);
  console.log(deleteProductResponse);
}

async function testArticleService() {
  const getArticleListResponse = await ArticleService.getArticleList(1, 20, '');
  const getArticleResponse = await ArticleService.getArticle(getArticleListResponse[0].id);

  const createArticleResponse = await ArticleService.createArticle(
    '안녕하세요',
    '내용입니다',
    'https://picsum.photos/200',
  );
  const patchArticleResponse = await ArticleService.patchArticle(
    createArticleResponse.id,
    createArticleResponse.title,
    '앞으로 잘 부탁드립니다.',
    createArticleResponse.image,
  );
  const deleteArticleResponse = await ArticleService.deleteArticle(createArticleResponse.id);

  console.log(getArticleListResponse);
  console.log(getArticleResponse);
  console.log(createArticleResponse);
  console.log(patchArticleResponse);
  console.log(deleteArticleResponse);
}

async function main() {
  await getProductListAndInstantiate();
  await testProductService();
  await testArticleService();
}

main();
