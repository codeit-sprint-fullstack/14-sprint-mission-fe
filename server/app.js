import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import Product from './model/Product.js'

await mongoose.connect(process.env.DATABASE_URL)
console.log('Connected to DB!')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/products', async (req, res) => {
  const sort = req.query.sort
  const limit = Number(req.query.limit) || 0
  const offset = Number(req.query.offset) || 0
  const keyword = req.query.keyword

  let filter = {}
  if (keyword) {
    filter = {
      $or : [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    }
  }
  const sortOption = {createdAt: sort === 'recent' ? 'desc' : 'asc'}

  const totalCount = await Product.countDocuments(filter)
  const products = await Product
    .find(filter)
    .sort(sortOption)
    .skip(offset)
    .limit(limit)

  res.send({
    totalCount,
    list: products,
  })
})

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Cannot find given id.'})
  }
})

app.post('/products', async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).send(newProduct)
})

app.patch('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key]
    })
    await product.save()
    res.send(product)
  } else {
    res.status(404).send({ message: 'Cannot find given id.'})
  }
  
})

app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (product) {
    res.sendStatus(204)
  } else {
    res.status(404).send({ message: 'Cannot find given id.'})
  }
})

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started!')
})
