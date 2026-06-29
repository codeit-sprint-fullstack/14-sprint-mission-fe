//시드 데이터 주입을 위한 1회용 스크립트 코드
import mongoose from 'mongoose';
import data from './seedData.js';
import Product from '../models/product.model.js';
import { DATABASE_URL } from '../env.js';

//데이터베이스 연다. 비동기로 연다. 
await mongoose.connect(DATABASE_URL);

//안에 있는 것들 다 지우고
await Product.deleteMany({});
//시드데이터 다 넣는다
await Product.insertMany(data);
//Data의 경우 mongoose.model로 만들어진 객체에 대한 메소드인듯?
//Mongoose 모델 API는 거의 항상 모델.연산() 형태다.  다..

//닫는다.
await mongoose.connection.close();