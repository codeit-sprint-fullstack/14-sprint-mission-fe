import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name:String,
    info:String,
    price:Number,
    tags:Array
})
const Product = mongoose.model("Product", productSchema);
export default Product;