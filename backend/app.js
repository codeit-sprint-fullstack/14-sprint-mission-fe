import express from 'express'
import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const DATABASE_URL = process.env.DATABASE_URL
const PORT = 3001

await mongoose.connect(DATABASE_URL)
console.log('Connected to DB')

const app = express()

app.use(express.json())
app.use(cors())


//GET list
app.get('/products', async (req, res) => {
  try {
    const sort = req.query.sort
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.count) || 10

    const skipIndex = (page - 1) * limit

    const sortOption = { _id: sort === 'recent' ? 'desc' : 'asc' }

    const totalProducts = await Product.countDocuments()
    const totalPages = Math.ceil(totalProducts / limit)

    const products = await Product.find()
      .sort(sortOption)
      .skip(skipIndex)
      .limit(limit)

    res.send({
      products: products,
      currentPage: page,
      totalPages: totalPages
    })
  } catch (e) {
    res.status(500).send({ message: '서버 오류가 발생했습니다' })
  }
})

//GET id
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Cannot find given id.' })
  }
})

//POST
app.post('/products', async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).send(newProduct)
})

//PATCH
app.patch('/products/:id', async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (product) {
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key]
    })

    // 이것 작성해야 mongoDB에 저장됨. 필수!
    await product.save()

    res.send(product)
  } else {
    res.status(404).send({ message: 'Cannot find given id.' })
  }
})

//DELETE
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  const product = await Product.findByIdAndDelete(id)
  if (product) {
    res.sendStatus(204)
  } else {
    res.status(404).send({ message: 'Cannot find given id. ' })
  }
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
