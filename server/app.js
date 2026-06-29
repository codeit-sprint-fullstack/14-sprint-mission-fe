import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import * as productController from './controller/product.controller.js';

await mongoose.connect(DATABASE_URL).then(() => console.log('database connected'))


const app = express();
// json에 괄호 아 
app.use(express.json());

// console.log('연결된 함수:', productController.getProduct);

app.get('/products', productController.getProduct);
app.post('/products', productController.createProduct);

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