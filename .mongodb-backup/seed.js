import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './Product.js'
import products from '../server/data/seedData.js'

dotenv.config()

await mongoose.connect(process.env.MONGODB_URI)

await Product.deleteMany({})

await Product.insertMany(products)

await mongoose.disconnect()

console.log('Seed data inserted successfully.')
