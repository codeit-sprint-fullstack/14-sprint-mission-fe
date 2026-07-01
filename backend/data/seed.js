import mongoose from 'mongoose';
import data from './seedData.js';
import Task from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL;

await mongoose.connect(DATABASE_URL);

await Task.deleteMany({});
await Task.insertMany(data);

await mongoose.connection.close();