// ProductService

import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct,
} from "./ProductService.js";


// ArticleService

import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle,
} from "./ArticleService.js";




// // Product 테스트

// // getProductList() -> 상품 목록 조회
// getProductList(1, 10, "recent", "")
// .then((data) => {
//   console.log("상품 목록 조회", data);
// })
// .catch((error) => {
//   console.error(error);
// })


// // createProduct(products) -> 상품 등록
// createProduct({
//   "images": [
//     "https://example.com/..."
//   ],
//   "tags": [
//     "전자제품"
//   ],
//   "price": 0,
//   "description": "string",
//   "name": "상품 이름",
// })
// .then((data) => {
//   console.log("상품 등록", data);
// })
// .catch((error) => {
//   console.error(error);
// })


// // getProduct(productId) -> 상품 상세 조회
// getProduct(4008)
// .then((data) => {
//   console.log("상품 상세 조회", data);
// })
// .catch((error) => {
//   console.error(error);
// })


// // patchProduct(productId) -> 상품 수정
// patchProduct(4008, {
//   "images": [
//     "https://example.com/..."
//   ],
//   "tags": [
//     "전자제품"
//   ],
//   "price": 0,
//   "description": "string",
//   "name": "상품 이름",
// })
// .then((data) => {
//   console.log("상품 수정", data);
// })
// .catch((error) => {
//   console.error(error);
// })


// // deleteProduct(productId) -> 상품 삭제
// deleteProduct(4008)
// .then((data) => {
//   console.log("상품 삭제", data);
// })
// .catch((error) => {
//   console.error(error);
// })



// // Article 테스트

// // getArticleList() -> 게시글 목록 조회
// getArticleList(1, 10, "recent", "")
// .then((data) => {
//   console.log("게시글 목록", data);
// })
// .catch((error) => {
//   console.error(error);
// })


// // createArticle() -> 게시글 등록
// createArticle({
//   "image": "https://example.com/...",
//   "content": "게시글 내용입니다.",
//   "title": "게시글 제목입니다.",
// })
// .then((data) => {
//     console.log("게시글 등록", data);
// })
// .catch((error) => {
//     console.error(error);
// });


// // getArticle() -> 게시글 상세 조회
// getArticle(6643)
// .then((data) => {
//   console.log("게시글 상세 조회", data)
// })
// .catch((error) => {
//   console.log(error);
// })


// // patchArticle() -> 게시글 수정
// patchArticle(6643, {
//   "image": "https://example.com/...",
//   "content": "게시글 내용입니다.",
//   "title": "게시글 제목입니다.",
// })
// .then((data) => {
//   console.log("게시글 수정", data)
// })
// .catch((error) => {
//   console.error(error);
// })


// // deleteArticle() -> 게시글 삭제
// deleteArticle(6643)
// .then((data) => {
//   console.log("게시글 삭제", data)
// })
// .catch((error) => {
//   console.error(error);
// })