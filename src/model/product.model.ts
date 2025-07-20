import mongoose from "mongoose";

const productModel =new mongoose.Schema(
    {
        "id": {
            required: true,
            type: Number,
            unique: true,
            index: true // For better performance on queries
        },
        "name": {
            required: true,
            type: String,
        },
        "price": {
            required: true,
            type: Number
        },
        "currency": {
            required: true,
            type: String
        },
        "image": {
            required: true,
            type: String
        }
    }
);

const Product
    = mongoose.model('Product', productModel);

export default Product;