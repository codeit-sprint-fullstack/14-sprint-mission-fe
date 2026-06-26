import mongoose from 'mongoose'

const connectDatabase = async () => {
  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  await mongoose.connect(MONGODB_URI)
  console.log('MongoDB connected')
}

export default connectDatabase
