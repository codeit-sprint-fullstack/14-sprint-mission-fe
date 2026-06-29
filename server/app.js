import express from 'express';
import cors from 'cors';
import productRouter from './routes/products.js';
import articleRouter from './routes/articles.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
