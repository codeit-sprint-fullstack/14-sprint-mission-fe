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
	articleService.getArticle(6615);
});

create_article_btn.addEventListener('click', function () {
	articleService.createArticle();
});

update_article_btn.addEventListener('click', function () {
	articleService.patchArticle(6615);
});

delete_article_btn.addEventListener('click', function () {
	articleService.deleteArticle(6615);
});

//상품
search_product_btn.addEventListener('click', function () {
	productService.getProductList(1);
});

search_product_by_id_btn.addEventListener('click', function () {
	productService.getProduct(3987);
});

create_product_btn.addEventListener('click', function () {
	productService.createProduct();
});

update_product_btn.addEventListener('click', function () {
	productService.patchProduct(3989);
});

delete_product_btn.addEventListener('click', function () {
	productService.deleteProduct(3989);
});