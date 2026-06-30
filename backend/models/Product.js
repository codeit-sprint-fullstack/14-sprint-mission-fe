import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    // id, name, description, price, tags, createdAt, updatedAt필드
    name: {
      type: String, 
      required: true, 
      maxLength: 30,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    price: {
      type: Number, 
      required: true, 
      min: 0,
      max: 999999999,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', ProductSchema)

export default Product