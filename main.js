import {getArticleList, getArticle, createArticle, patchArticle, deleteArticle} from './ArticleService.js';
import {getProductList, getProduct, createProduct, patchProduct, deleteProduct} from './ProductService.js';



// createArticle({
//   image: 'https://codeit.com/...',
//   content: '게시글 내용입니다.',
//   title: '게시글 제목입니다.'
// })
//   .then((data) => {
//     console.log('createArticle 결과:', data);
//   })
//   .catch((error) => {
//     console.error('오류:', error)
// });


//   getArticleList(10, 6, '')
//   .then((data) => {
//     // 🟢 성공했을 때 실행 (서버가 응답을 잘 줬을 때)
//     console.log(data); 
//   })
//   .catch((error) => {
//     // ❌ 실패했을 때 실행 (인터넷이 끊겼거나 서버가 터졌을 때)
//     console.error(error); 
//   });

// getArticle(6421)
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error(error);
// });

// patchArticle(6421, {
//     title: '타이틀 수정',
//     content: '내용 수정',
//     image: 'https://codeit.com/...'
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error(error);
// });

// deleteArticle(6663)
// .then((data) => {
//     console.log('no data');
// })
// .catch((error) => {
//     console.error(error);
// });

// createProduct({
//     name: '냉장고',
//     description: '최신형 냉장고입니다.',
//     price: 1000000,
//     tags: ['가전제품', '삼성 냉장고'],
//     images: 'https://example.com/...'
// })
// .then((data) => {
//     console.log('createProduct 결과:', data);
// })
// .catch((error) => {
//     console.error('오류',error);
// });

// getProductList(1, 3, '냉장고')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error('오류 입니다',error);
// });

// getProduct(3986)
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error('오류 입니다',error);
// });

// patchProduct(3986,{
//     name: '세탁기',
//     description: '최신형 세탁기입니다.',
//     price: 800000,
//     tags: ['가전제품', '삼성 세탁기'],
//     images: ['https://codeit.com/...']
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error('오류 입니다',error);
// });

// deleteProduct(3986)
// .then((data) => {
//     console.log('no data');
// })
// .catch((error) => {
//     console.error('오류 입니다',error);
// });