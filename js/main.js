// =============================================
// main.js
// ProductService / ArticleService 함수 실행 및 동작 확인
// =============================================

// 모듈 import (ES Module 방식)
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";

// -----------------------------------------------
// Product API 테스트 (async/await 방식)
// -----------------------------------------------
async function runProductExamples() {
  console.log("=== Product API 테스트 ===");

  // 1페이지, 5개 목록 조회
  const productList = await getProductList({ page: 1, pageSize: 5 });
  console.log("getProductList:", productList);

  // 새 상품 등록
  const newProduct = await createProduct({
    name: "테스트 상품",
    description: "테스트용 상품입니다.",
    price: 10000,
    tags: ["테스트", "샘플"],
    images: ["https://example.com/image.jpg"],
  });
  console.log("createProduct:", newProduct);

  // 등록된 상품으로 단건 조회 → 수정 → 삭제 순서로 실행
  if (newProduct?.id) {
    const product = await getProduct(newProduct.id);
    console.log("getProduct:", product);

    const patched = await patchProduct(newProduct.id, { price: 20000 });
    console.log("patchProduct:", patched);

    const deleted = await deleteProduct(newProduct.id);
    console.log("deleteProduct:", deleted);
  }
}

// -----------------------------------------------
// Article API 테스트 (.then() 체이닝 방식)
// -----------------------------------------------
function runArticleExamples() {
  console.log("=== Article API 테스트 ===");

  // 1페이지, 5개 목록 조회 → 새 게시글 등록
  getArticleList({ page: 1, pageSize: 5 })
    .then((articleList) => {
      console.log("getArticleList:", articleList);

      // 새 게시글 등록
      return createArticle({
        title: "테스트 게시글",
        content: "테스트 내용입니다.",
        image: "https://example.com/image.jpg",
      });
    })
    .then((newArticle) => {
      console.log("createArticle:", newArticle);

      // 등록된 게시글로 단건 조회 → 수정 → 삭제 순서로 체이닝
      if (newArticle?.id) {
        return getArticle(newArticle.id)
          .then((article) => {
            console.log("getArticle:", article);
            return patchArticle(newArticle.id, { title: "수정된 제목" });
          })
          .then((patched) => {
            console.log("patchArticle:", patched);
            return deleteArticle(newArticle.id);
          })
          .then((deleted) => {
            console.log("deleteArticle:", deleted);
          });
      }
    })
    .catch((error) => console.error("Article 테스트 오류:", error));
}

// 실행
runProductExamples();
runArticleExamples();
