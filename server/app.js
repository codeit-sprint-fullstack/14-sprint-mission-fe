import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect(process.env.DATABASE_URL)
console.log('Connected to DB!')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(process.env.PORT, () => {
  console.log('Server Started!')
})
