import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {type: Array, required: true},
    price: {type: Number, required: true },
    name: {type: String, required: true},
    bestseller: {type: Boolean},
    category: {type: String, required: true},
    subcategory: {type: String, required: true},
    description: {type: String},
    size: {type: Array, required: true},
    date: {type: Number, default:Date.now}
})
const productModel = mongoose.models.product || mongoose.model("product", productSchema)
export default productModel;