import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import articleRouter from './routes/articleRouter.js';
import commentRouter from './routes/commentRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/items', productRouter);
app.use('/users', userRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.get('/', (req, res) => {
    res.send('server is alive');
});

app.listen(3000, () => {
    console.log('Server is running in port 3000');
});
