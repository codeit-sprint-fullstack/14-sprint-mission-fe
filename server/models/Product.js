import mongoose from 'mongoose'

export const PRODUCT_NAME_MAX_LENGTH = 10
export const PRODUCT_DESCRIPTION_MIN_LENGTH = 10
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 100
export const PRODUCT_TAG_MIN_LENGTH = 1
export const PRODUCT_TAG_MAX_LENGTH = 5

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '상품명을 입력해주세요.'],
      trim: true,
      maxlength: [
        PRODUCT_NAME_MAX_LENGTH,
        `상품명은 ${PRODUCT_NAME_MAX_LENGTH}자 이내로 입력해주세요.`,
      ],
    },
    description: {
      type: String,
      required: [true, '상품 소개를 입력해주세요.'],
      trim: true,
      minlength: [
        PRODUCT_DESCRIPTION_MIN_LENGTH,
        `상품 소개는 ${PRODUCT_DESCRIPTION_MIN_LENGTH}자 이상 입력해주세요.`,
      ],
      maxlength: [
        PRODUCT_DESCRIPTION_MAX_LENGTH,
        `상품 소개는 ${PRODUCT_DESCRIPTION_MAX_LENGTH}자 이내로 입력해주세요.`,
      ],
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
            tags.every(
              (tag) =>
                tag.length >= PRODUCT_TAG_MIN_LENGTH &&
                tag.length <= PRODUCT_TAG_MAX_LENGTH,
            ),
          message: `태그는 ${PRODUCT_TAG_MIN_LENGTH}자 이상 ${PRODUCT_TAG_MAX_LENGTH}자 이내로 입력해주세요.`,
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
