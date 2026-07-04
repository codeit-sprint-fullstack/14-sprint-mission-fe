import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '상품명을 입력해주세요.'],
      trim: true,
      maxlength: [10, '상품명은 10자 이내로 입력해주세요.'],
    },
    description: {
      type: String,
      required: [true, '상품 소개를 입력해주세요.'],
      trim: true,
      minlength: [10, '상품 소개는 10자 이상 입력해주세요.'],
      maxlength: [100, '상품 소개는 100자 이내로 입력해주세요.'],
    },
    price: {
      type: Number,
      required: [true, '판매 가격을 입력해주세요.'],
      min: [0, '판매 가격은 0원 이상이어야 합니다.'],
      validate: {
        validator: Number.isInteger,
        message: '판매 가격은 정수로 입력해주세요.',
      },
    },
    tags: {
      type: [String],
      default: [],
      set: (tags) =>
        Array.isArray(tags)
          ? tags.map((tag) => (typeof tag === 'string' ? tag.trim() : tag))
          : tags,
      validate: [
        {
          validator: (tags) => tags.length > 0,
          message: '태그를 1개 이상 입력해주세요.',
        },
        {
          validator: (tags) =>
            tags.every((tag) => tag.length >= 1 && tag.length <= 5),
          message: '태그는 1자 이상 5자 이내로 입력해주세요.',
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
