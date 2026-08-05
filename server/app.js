import express from 'express';
import cors from 'cors';
import productRouter from './routes/products.js';
import articleRouter from './routes/articles.js';
import { createCommentItemRouter } from './routes/comments.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);
app.use('/articles', articleRouter);
// 댓글 수정/삭제는 댓글 id만으로 대상이 특정되므로 공통 경로로 둔다
app.use('/comments', createCommentItemRouter());

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
