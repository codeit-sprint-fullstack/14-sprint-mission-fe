import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '상품명을 입력해주세요.'],
      trim: true,
      validate: {
        validator: (value) => value.length >= 1 && value.length <= 10,
        message: '상품명은 1자 이상 10자 이내로 입력해주세요.',
      },
    },
    description: {
      type: String,
      required: [true, '상품 소개를 입력해주세요.'],
      trim: true,
      validate: {
        validator: (value) => value.length >= 10 && value.length <= 100,
        message: '상품소개는 10자 이상 100자 이내로 입력해주세요.',
      },
    },
    price: {
      type: Number,
      required: [true, '판매 가격을 입력해주세요.'],
      min: [0, '판매 가격은 0원 이상이어야 합니다.'],
    },
    tags: {
      type: [String],
      default: [],
      validate: [
        {
          validator: (tags) => tags.length > 0,
          message: '태그를 1개 이상 입력해주세요.',
        },
        {
          validator: (tags) => tags.every((tag) => tag.trim().length <= 5),
          message: '태그는 5자 이내로 입력해주세요.',
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', productSchema)

export default Product
