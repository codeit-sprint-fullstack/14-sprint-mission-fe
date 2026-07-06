import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 10
    },
    description: {
      type: String,
      minLength: 10,
      maxLength: 100
    },
    price: {
      type: Number,
      required: true,
      min: 1
    },
    tags: {
      type: [
        {
          type: String,
          maxLength: 5,
        }
      ],
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product