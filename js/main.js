import productService from './ProductService.js';
import articleService from './ArticleService.js';


// const getProductList = await productService.getProductList();
// console.log(getProductList);

// const createProduct = await productService.createProduct(
//   {
//     "name" : "판다",
//     "description" : "통통한 아기 판다",
//     "price" : 0,
//     "tags" : [ "동물" ],
//     "images" : [ "https://img7.yna.co.kr/mpic/YH/2016/09/30/MYH20160930019000038_P4.jpg" ],
//   }
// )
// console.log(createProduct);

// const patchProduct = await productService.patchProduct( 4028, {
//   'name' : '김판다',
// })
// console.log(patchProduct);

// const deleteProduct = await productService.deleteProduct(4025);
// console.log(deleteProduct);


const getArticleList = await articleService.getArticleList();
console.log(getArticleList);

// const getArticle = await articleService.getArticle(6662);
// console.log(getArticle);

// const createArticle = await articleService.createArticle('제목입니다','내용입니다','https://i.namu.wiki/i/yd9eHl9hv_AFypUNotnPmppPeJdkGmCPFAq_tJ5juAkAZu_YoVBQz4MX_CrutNHdFrrT-3OrWhXAC9SEfxEQHQ.webp');
// console.log(createArticle);

// const patchArticle = await articleService.patchArticle (6668, {
//   'title' : '제목이었던 것',
// });
// console.log(patchArticle);

// const deleteArticle = await articleService.deleteArticle(6668);
// console.log(deleteArticle);
