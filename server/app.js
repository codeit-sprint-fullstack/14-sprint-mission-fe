import cors from 'cors'
import express from 'express'

import articleCommentRoutes from './routes/articleCommentRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/products', productRoutes)
app.use('/articles', articleRoutes)
app.use('/article-comments', articleCommentRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
