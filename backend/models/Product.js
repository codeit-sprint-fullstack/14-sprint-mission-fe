import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    // id, name, description, price, tags, createdAt, updatedAt필드
    name: {
      type: String,
      required: true,
      minLenghth: 1,
      maxLength: 10,
    },
    description: {
      type: String,
      minLenghth: 10,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 999999999,
    },
    tags: {
      type: String,
      maxLength: 5
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', ProductSchema)

export default Product