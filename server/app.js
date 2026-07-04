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

app.get('/products', async (req, res, next) => {
  try {
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
        .select('name price createdAt')  // 허용 필드만 골라서 반영
        .sort(sortOption)
        .skip(offset)
        .limit(limit)

    res.send({ totalCount, list: products })
  } catch (err) {
    next(err)
  }
})

app.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send({ message: 'Cannot find given id.' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/products', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
  } catch (err) {
    next(err)
  }
})

app.patch('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).send({ message: 'Cannot find given id.'})
    }

    // 허용 필드만 골라서 반영
    const allowedFields = ['name', 'description', 'price', 'tags']
    allowedFields.forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key]
      }
    })

    await product.save()
    res.send(product)
  } catch (err) {
    next(err)
  }
})

app.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (product) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ message: 'Cannot find given id.' })
    }
  } catch(err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message })
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Cannot find given id.' })
  }
  console.error(err) 
  res.status(500).send({ message: err.message })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started!')
})
