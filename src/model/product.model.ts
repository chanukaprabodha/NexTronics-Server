import mongoose from "mongoose";

const productModel =new mongoose.Schema(
    {
        "id": {
            required: true,
            type: String,
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
        "description": {
            type: String,
            default: ''
        },
        "image": {
            required: true,
            type: String
        },
        "quantity": {
            required: true,
            type: Number,
            default: 0
        },
        "isWishlisted": {
            type: Boolean,
            default: false
        }
    }
);

const Product
    = mongoose.model('Product', productModel);

export default Product;