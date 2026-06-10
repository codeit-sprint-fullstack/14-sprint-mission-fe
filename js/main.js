import { articleService } from "./ArticleService.js";
import { productService } from "./ProductService.js";

const search_article_btn = document.getElementById('search_article_btn');
const search_article_by_id_btn = document.getElementById('search_article_by_id_btn');
const create_article_btn = document.getElementById('create_article_btn');
const update_article_btn = document.getElementById('update_article_btn');
const delete_article_btn = document.getElementById('delete_article_btn');

const search_product_btn = document.getElementById('search_product_btn');
const search_product_by_id_btn = document.getElementById('search_product_by_id_btn');
const create_product_btn = document.getElementById('create_product_btn');
const update_product_btn = document.getElementById('update_product_btn');
const delete_product_btn = document.getElementById('delete_product_btn');

search_article_btn.addEventListener('click', function () {
	articleService.getArticleList(1);
});

search_article_by_id_btn.addEventListener('click', function () {
	articleService.getArticle(6691);
});

create_article_btn.addEventListener('click', function () {
	articleService.createArticle("https://www.utoimage.com/?m=goods.free&mode=view&idx=22250682", "게시글입니다.", "게시글 제목입니다.");
});

update_article_btn.addEventListener('click', function () {
	articleService.patchArticle(6691, "https://www.utoimage.com/?m=goods.free&mode=view&idx=22250682", "게시글입니다.", "게시글 제목입니다.");
});

delete_article_btn.addEventListener('click', function () {
	articleService.deleteArticle(6692);
});

//상품
search_product_btn.addEventListener('click', function () {
	productService.getProductList(1);
});

search_product_by_id_btn.addEventListener('click', function () {
	productService.getProduct(4045);
});

create_product_btn.addEventListener('click', function () {
	productService.createProduct(["https://www.utoimage.com/?m=goods.free&mode=view&idx=22250682"], ['강아지'], 3000, '설명입니다.', '강아지');
});

update_product_btn.addEventListener('click', function () {
	productService.patchProduct(4045, ["https://www.utoimage.com/?m=goods.free&mode=view&idx=22250682"], ['강아지'], 3000, '설명입니다.', '강아지');
});

delete_product_btn.addEventListener('click', function () {
	productService.deleteProduct(4046);
});