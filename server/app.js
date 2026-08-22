import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/products', productRoutes)
app.use('/articles', articleRoutes)
app.use('/comments', commentRoutes)
app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => console.log('Server Started!'))