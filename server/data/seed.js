import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../model/Product.js'
import data from './seedData.js'

await mongoose.connect(process.env.DATABASE_URL)

await Product.deleteMany({})
await Product.insertMany(data)

await mongoose.connection.close()