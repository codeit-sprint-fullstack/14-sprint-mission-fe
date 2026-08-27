import 'dotenv/config';
import express from 'express';
import passport from '../config/passport.js';
import errorHandler from '../middlewares/errorHandler.js';
import articleRouter from '../routes/articleRoute.js';
import authRouter from '../routes/authRoute.js';
import { articleCommentRouter, commentRouter, productCommentRouter } from '../routes/commentRoute.js';
import imageRouter from '../routes/imageRoute.js';
import productRouter from '../routes/productRoute.js';
import userRouter from '../routes/userRoute.js';

const app = express();

/********** middleware ***********/
app.use(express.json());
app.use(passport.initialize());

/************* route *************/
app.use('/auth', authRouter);
app.use('/users/me', userRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/products/:productId/comments', productCommentRouter);
app.use('/articles/:articleId/comments', articleCommentRouter);
app.use('/comments/:commentId', commentRouter);
app.use('/images/upload',imageRouter);
app.use('/uploads', express.static('uploads')); 
// express.static('폴더 이름') 브라우저가 이미지가 저장된 서버 폴더에 접근할 수 있도록 설정
// http://localhost:3001/uploads/cat.jpeg -> 브라우저에서 서버 uploads 폴더 내 파일에 접근 가능

/************* error *************/
app.use(errorHandler);

app.listen(process.env.PORT ?? 3001, () => console.log('Server Started!'));