import 'dotenv/config';
import express from 'express';
import passport from '../config/passport.js';
import errorHandler from '../middlewares/errorHandler.js';
import authRouter from '../routes/authRoute.js';

const app = express();

/********** middleware ***********/
app.use(express.json());
app.use(passport.initialize());

/************* route *************/
app.use('/auth', authRouter);


/************* error *************/
app.use(errorHandler);
app.listen(process.env.PORT ?? 3001, () => console.log('Server Started!'));