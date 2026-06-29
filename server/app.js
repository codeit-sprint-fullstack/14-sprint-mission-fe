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

app.listen(3000, () => console.log('3000: Server Started'));