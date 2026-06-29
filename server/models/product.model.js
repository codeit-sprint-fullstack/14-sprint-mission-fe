import mongoose from "mongoose";


// id, createdAt, updateAt은 데이터베이스에서 알아서 만들어준다.
// 주입해줘도 됨 그럼 주입된 값이 우선 처리 된다
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 30, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    tags: { type: [String], default: [], },
  },
  {
    timestamps: true,
  }

)

const Product = mongoose.model('Product', DataSchema);

export default Product;