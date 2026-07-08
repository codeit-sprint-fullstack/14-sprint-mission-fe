import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    tags:[String]
},{
    timesStamps :true,
}
)
const Product = mongoose.model("Product", productSchema);
export default Product;