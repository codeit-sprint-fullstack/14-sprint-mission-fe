import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 10,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength:10,
      maxlength:100,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    tags: {
      type: [
        {
        type:String,
        trim:true,
        maxlength: 5,
        },
      ],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "태그는 최소 1개 이상 입력해야합니다."
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;