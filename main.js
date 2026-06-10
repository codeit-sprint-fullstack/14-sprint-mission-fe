import ArticleService from "./ArticleService.js";
import ProductService from "./ProductService.js";

// Article API 테스트
const articleParams = {
  page: 1,
  pageSize: 10,
  keyword: '',
}
ArticleService.getArticleList(articleParams)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))
  
ArticleService.getArticle(25)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

const createdArticleData = {
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  image: 'https://example.com/...',
}
ArticleService.createArticle(createdArticleData)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

const patchedArticleData = {
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  image: 'https://example.com/...',
}
ArticleService.patchArticle(25, patchedArticleData)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

ArticleService.deleteArticle(25)
  .then((data) => console.log(data))
  .catch((e) => console.log('에러 발생: ', e.message))

// Product API 테스트
const productParams = {
  page: 1,
  pageSize: 10,
  orderBy: 'recent',
  keyword: '',
}
try {
  const productList = await ProductService.getProductList(productParams)
  console.log(productList)
} catch (e) {
  console.log('에러 발생: ', e.message)
}

try {
  const product = await ProductService.getProduct(4011)
  console.log(product)
} catch (e) {
  console.log('에러 발생: ', e.message)
}

const createdProductData = {
  name: '상품 이름',
  description: 'string',
  price: 0,
  tags: [ ],
  images: [ 'https://example.com/...' ],
}
try {
  const createdProduct = await ProductService.createProduct(createdProductData)
  console.log(createdProduct)
} catch (e) {
  console.log('에러 발생: ', e.message)
}

const patchedProductData = {
  name: '상품 이름',
  description: 'string',
  price: 0,
  tags: [],
  images: ['https://example.com/...']
}
try {
  const patchedProduct = await ProductService.patchProduct(4010, patchedProductData)
  console.log(patchedProduct)
} catch (e) {
  console.log('에러 발생: ', e.message)
}

try {
  const deletedProduct = await ProductService.deleteProduct(4010)
  console.log(deletedProduct)
} catch (e) {
  console.log('에러 발생: ', e.message)
}