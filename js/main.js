import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './ProductService.js';

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './ArticleService.js';


async function testArticle() {
  console.log('ArticleService 테스트하기')

  const list = await getArticleList();
  console.log('게시글 리스트:', list);

  const newArticle = await createArticle(
    '테스트',
    '내용',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvj5DFPrNksnkqeUD1A-5gAc7hP4MyCCSFhYX2-tWpLU0VQW_ov5WxnRnu&s=10'
  );
  console.log('생성:', newArticle);

  const article = await getArticle(newArticle.id);
  console.log('아까 생성한 게시글:', article);

  const patcharticle = await patchArticle(newArticle.id, '수정한테스트타이틀', '수정하였습니다', undefined);
  console.log('수정한 게시글: ', patcharticle);

  const result = deleteArticle(newArticle.id);
  console.log('삭제 결과: ', result)
}

async function testProduct() {
  console.log('ProductService 테스트하기')

  const list = await getProductList();
  console.log('상품 리스트:', list);

  const newProduct = await createProduct(
    '과자',
    '과자입니다',
    1000,
    '과자태그',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvj5DFPrNksnkqeUD1A-5gAc7hP4MyCCSFhYX2-tWpLU0VQW_ov5WxnRnu&s=10'
  );
  console.log('생성:', newProduct);

  const product = await getProduct(newProduct.id);
  console.log('아까 생성한 상품:', product);

  const patchproduct = await patchProduct(newProduct.id, '수정한과자이름');
  console.log('수정한 상품: ', patchproduct);

  const result = deleteProduct(newProduct.id);
  console.log('삭제 결과: ', result)
}

testArticle();
testProduct();