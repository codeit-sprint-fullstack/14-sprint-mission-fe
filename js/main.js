import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService";

// ArticleService
getArticleList(1, 10, "");
getArticle("1");
createArticle("제목", "내용", "https://example.com/...");
patchArticle("1", {
    title: "수정 된 제목"
});
deleteArticle("1");

// ProductService
getProductList(1, 10, "");
getProduct("1");
createProduct("이름", "설명", "0", "태그", "https://example.com/...");
patchProduct("1", {
    name: "수정 된 이름"
});
deleteProduct("1");
