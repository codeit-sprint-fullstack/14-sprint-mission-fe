import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String,
    },
    price: {
      type: Number
    },
    images: {
        type: [String],
        default: [],
    },
    tags: {
       type: [String]
    },
    favoriteCount: {
        type: Number,
        default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;