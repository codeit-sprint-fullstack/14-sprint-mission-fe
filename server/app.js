import express from 'express';
import cors from 'cors';
import * as productController from './controller/product.controller.js';
import * as articleController from './controller/article.controller.js';
import * as articleCommentController from './controller/articleComment.controller.js';
import * as productCommentController from './controller/productComment.controller.js';

const app = express();
// json에 괄호 꼭 붙이기
app.use(express.json());
app.use(cors());

app.get('/products', productController.getProductList);
app.get('/products/:id', productController.getProduct);
app.post('/products', productController.createProduct);
app.patch('/products/:id', productController.patchProduct);
app.delete('/products/:id', productController.deleteProduct);

app.get('/article', articleController.getArticleList);
app.get('/article/:id', articleController.getArticle);
app.post('/article', articleController.createArticle);
app.patch('/article/:id', articleController.patchArticle);
app.delete('/article/:id', articleController.deleteArticle);

//중첩은 3단 이상이 되지 않게, 고유 id로 특정 가능한 단일 리소스 조작은 최상위로 평탄화.
app.get('/articles/:articleId/comments', articleCommentController.getArticleCommentList);
app.post('/articles/:articleId/comments', articleCommentController.createArticleComment);
app.patch('/article-comments/:id', articleCommentController.patchArticleComment);
app.delete('/article-comments/:id', articleCommentController.deleteArticleComment);

app.get('/products/:productId/comments', productCommentController.getProductCommentList);
app.post('/products/:productId/comments', productCommentController.createProductComment);
app.patch('/product-comments/:id', productCommentController.patchProductComment);
app.delete('/product-comments/:id', productCommentController.deleteProductComment);

// 에러처리
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Cannot find given id.' });
  } else {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => console.log('3000: Server Started'));