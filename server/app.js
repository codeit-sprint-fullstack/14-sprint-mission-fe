import cors from 'cors';
import express from 'express';
import articleRouter from './routes/articles.js';
import commentRouter from './routes/comments.js';
import productRouter from './routes/products.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();
const localDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...localDevOrigins, ...configuredOrigins])];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    const error = new Error('CORS 정책에 의해 차단되었습니다.');
    error.status = 403;
    callback(error);
  },
}));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.use('/api/products', productRouter);
app.use('/api/articles', articleRouter);
app.use('/api/comments', commentRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
