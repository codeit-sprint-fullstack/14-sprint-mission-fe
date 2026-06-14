import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';

// Article API 테스트
getArticleList({ page: 1, pageSize: 20, keyword: '' }).then(result => {
  console.log('Article 목록:', result);
});

getArticle(6587).then(result => {
  console.log('Article 상세:', result);
});

createArticle({
  title: '고양이는 귀여워!',
  content: '세상에 귀엽지 않은 고양이는 없다.',
  image: 'https://이미지.com/cat.jpg',
}).then(result => {
  console.log('Article 등록 결과:', result);
});

// createArticle 함수로 생성된 id인 6589 사용
patchArticle(6589, { title: '고양이는 여전히 귀엽다!' }).then(result => {
  console.log('Article 수정 결과:', result);
});

// createArticle 함수로 생성된 id인 6589 사용
deleteArticle(6589).then(result => {
  if (result) console.log('Article 삭제 성공');
});

// Product API 테스트
getProductList({ page: 1, pageSize: 5, keyword: '전자제품' }).then(result => {
  console.log('Product 목록:', result);
});

getProduct(3865).then(result => {
  console.log('Product 상세:', result);
});

createProduct({
  name: '냐한남자 춘배인형',
  description: '50cm 크기',
  price: 58000,
  tags: ['고양이', '인형'],
  images: ['https://이미지.com/item.jpg'],
}).then(result => {
  console.log('Product 등록 결과:', result);
});

// createProduct 함수로 생성된 id인 3981 사용
patchProduct(3981, { price: 49900 }).then(result => {
  console.log('Product 수정 결과:', result);
});

// createProduct 함수로 생성된 id인 3981 사용
deleteProduct(3981).then(result => {
  if (result) console.log('Product 삭제 성공');
});