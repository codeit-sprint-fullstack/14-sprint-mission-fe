import 'dotenv/config';
import mongoose from 'mongoose';
import data from './seedData.js';
import Task from '../models/Task.js';

await mongoose.connect(process.env.DATABASE_URL);

await Task.deleteMany({});
await Task.insertMany(data);

await mongoose.connection.close();