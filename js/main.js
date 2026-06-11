import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";

getArticleList(1, 10, "");
getArticle(6712);
createArticle("제목제목", "내용", "https://image.com");
patchArticle(6712, "수정수ㅡ장제목", "수정내용", "https://image.com");
deleteArticle(4038);

getProductList(1, 10, "");
getProduct(6704);
createProduct("상품품명", "설명", 10000, ["태그1"], ["https://image.com"]);
patchProduct(6704, "수정상품품명", "수정설명", 20000, ["태그1"], ["https://image.com"]);
deleteProduct(4038);