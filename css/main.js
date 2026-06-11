import ArticleService from './ArticleService.js';
import ProductService from './ProductService.js';

//Article 

 ArticleService.getArticleList(1, 3, '안녕')
  .then((result)=> {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });

ArticleService.getArticle(12)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });

let articleId;
async function createArticleResult() {
  return ArticleService.createArticle({
      title: '타이틀입니다',
      content: '컨텐츠 입니다.',
      image: 'https://example.com/...'
  }).then((result) => {
      articleId = result.id;
      console.log('게시물 생성 성공', result);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

async function patchArticleResult() {
  return ArticleService.patchArticle(articleId, {
    title: '타이틀 입니다',
    content: '컨텐츠 입니다.',
    image: 'https://example.com/...'
  })
  .then((result) => {
    articleId = result.id;
    console.log('게시물 수정 성공', result);
  })
  .catch((error) => {
    console.error(error.message);
  });
}

async function deleteArticleResult(){
  return ArticleService.deleteArticle(articleId)
  .then((result)=>{
    console.log('게시물 삭제 완료',result);
  })
  .catch((error)=>{
    console.error(error.message);
  })
};

async function articleTest() {
  await createArticleResult();
  await patchArticleResult();
  await deleteArticleResult();
};
articleTest();

//Product

async function productListResult() {
  const result = await ProductService.getProductList(1, 5, '전자');
  console.log(result);
}
productListResult();

async function productResult(){
  const result = await ProductService.getProduct(340);
  console.log(result);
}
productResult();

let productId;
async function createProductResult(){
  const result = await ProductService.createProduct(
    '상품 이름',
    '상품 설명',
    1000,
    ['태그'],
    ['https://example.com/image.jpg']
  )
  productId = result.id;
  console.log(result);
}

async function patchProductResult(){
  const result = await ProductService.patchProduct(
    productId,
    '상품 이름',
    '상품 설명',
    1000,
    ['태그'],
    ['https://example.com/image.jpg']
  )
  productId = result.id;
  console.log(result);
}

async function delProductResult() {
  const result = await ProductService.deleteProduct(productId);
  console.log('상품 삭제 완료', result);
}


async function productTest(){
  await createProductResult();
  await patchProductResult();
  await delProductResult()
}
productTest()