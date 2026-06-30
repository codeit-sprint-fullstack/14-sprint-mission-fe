import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Product from './models/Product.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Panda Market API Server')
})

// 상품 등록
app.post('/products', async (req, res) => {
  const product = await Product.create(req.body)

  res.status(201).send(product)
})


// 상품 목록 조회
app.get('/products', async (req, res) => {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 10
  const keyword = req.query.keyword || ''
  const orderBy = req.query.orderBy || 'recent'

  const filter = keyword
    ? {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }
    : {}

  //정렬방식
  const sortOption =
    orderBy === 'favorite'
      ? { favoriteCount: 'desc' }
      : { createdAt: 'desc' }

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(offset)
    .limit(limit)
    .select('_id name price favoriteCount createdAt')

  const totalCount = await Product.countDocuments(filter)

  res.send({
    list: products,
    totalCount,
  })
})

// 상품 상세 조회
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).select(
    '_id name description price tags createdAt'
  )

  if (!product) {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  res.send(product)
})

// 상품 수정
app.patch('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  Object.keys(req.body).forEach((key) => {
    product[key] = req.body[key]
  })

  await product.save()

  res.send(product)
})

// 상품 삭제
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  res.sendStatus(204)
})

// 에러 처리
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: err.message,
    })
  }

  if (err.name === 'CastError') {
    return res.status(404).send({
      message: 'Cannot find given id.',
    })
  }

  console.error(err)

  res.status(500).send({
    message: 'Internal Server Error',
  })
})


await mongoose.connect(process.env.DATABASE_URL)
console.log('Connected to DB')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})