import mongoose from "mongoose";
import dotenv from "dotenv";
import seedData from "./seedData.js";
import Product from "../models/Product.js";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

await mongoose.connect(databaseUrl);

await Product.deleteMany({});
await Product.insertMany(seedData);

await mongoose.connection.close();
