import express from 'express';
import cors from 'cors';
import * as productController from './controller/product.controller.js';

const app = express();
// json에 괄호 꼭 붙이기
app.use(express.json());
app.use(cors());

app.get('/products', productController.getProductList);
app.get('/products/:id', productController.getProduct);
app.post('/products', productController.createProduct);
app.patch('/products/:id', productController.patchProduct);
app.delete('/products/:id', productController.deleteProduct);

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