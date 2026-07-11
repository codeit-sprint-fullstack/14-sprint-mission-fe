import 'dotenv/config'
import express from 'express'

import productRoutes from './routes/productRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
app.use(express.json())

app.use('/products', productRoutes)
app.use('/articles', articleRoutes)
app.use('/', commentRoutes)
app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => console.log('Server Started!'))