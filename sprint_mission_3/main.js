import ArticleService from './ArticleService.js'
import ProductService from './ProductService.js'

const testData = {
  "image": "https://codeit.com",
  "content": "스프린트 미션중입니다.",
  "title": "스프린트 미션8"
}

const changeData = {
  "image": "https://codeit.com",
  "content": "스프린트 미션테스트 입니다.",
  "title": "스프린트 미션8"
}

const products_test = {
  "images": [
    "https://codeit.com"
  ],
  "tags": [
    "전자제품"
  ],
  "price": 30000,
  "description": "string",
  "name": "자바스크립트 기본"
}

const products_change = {
  "images": [
    "https://codeit.com"
  ],
  "tags": [
    "전자제품"
  ],
  "price": 100000,
  "description": "string",
  "name": "FS14기 코스"
}


// // Article 테스트
try{
  await ArticleService.getArticle();  // 전체 호출


  await ArticleService.getArticleList({page: 1, pageSize: 2, keyword: '미션'}); // 데이터 검색


  const tmp = await ArticleService.createArticle(testData); // 데이터 추가 (id를 뽑아내기 위한 객체 저장 tmp);


  await ArticleService.patchArticle(tmp.id, changeData); // 데이터 수정


  await ArticleService.deleteArticle(tmp.id); // 데이터 삭제


  await ArticleService.deleteArticle(tmp.id); // 404 오류 테스트용


} catch(err){
  console.log("오류 발생:", err.message);
}


// Product 테스트
try{
  await ProductService.getProduct();  // 전체 호출


  await ProductService.getProductList({page: 1, pageSize: 2, keyword: '기본'}); // 데이터 검색


  const tmp = await ProductService.createProduct(products_test); // 데이터 추가 (id를 뽑아내기 위한 객체 저장 tmp);


  await ProductService.patchProduct(tmp.id, products_change); // 데이터 수정


  await ProductService.deleteProduct(tmp.id); // 데이터 삭제


  await ProductService.deleteProduct(tmp.id); // 404 오류 테스트용


} catch(err){
  console.log("오류 발생:", err.message);
}