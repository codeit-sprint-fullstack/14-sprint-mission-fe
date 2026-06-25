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
        type: [String]
    },
    tags: {
       type: [String]
    },
    favoriteCount: {
        type: Number
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;