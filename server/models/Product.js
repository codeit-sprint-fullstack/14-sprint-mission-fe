import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [1, '상품 이름은 최소 1글자 이상이어야 합니다.'],
      maxLength: [10, '상품 이름은 최대 10글자 이하이어야 합니다.'],
    },
    description: {
      type: String,
      required: true,
      minLength: [10, '상품 설명은 최소 10글자 이상이어야 합니다.'],
      maxLength: [100, '상품 설명은 최대 100글자 이하이어야 합니다.'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, '가격은 0원 이상이어야 합니다.'],
    },
    tags: {
      type: [String],
      validate: [
        {
          // 컴스텀 요구사항
          validator: function (array) {
            return array.length <= 3
          },
          message: '태그는 최대 3개까지 등록할 수 있습니다.',
        },
        {
          validator: function (array) {
            return !array.some((tag) => tag.length > 5)
          },
          message: '태그는 최대 5글자 이하이어야 합니다.',
        },
      ],
    },
  },
  {
    timestamps: true,
  },
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
