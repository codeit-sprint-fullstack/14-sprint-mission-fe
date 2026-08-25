import 'dotenv/config';
import express from 'express';
import authRouter from '../routes/authRoute.js';
import errorHandler from '../middlewares/errorHandler.js';

const app = express();
app.use(express.json());

// 인증
app.use('/auth', authRouter);


// 에러 핸들러
app.use(errorHandler);

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log('Server Started!'));