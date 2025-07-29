import mongoose, {Schema,Document} from "mongoose";
import {cartItemDto} from "../dto/cartItemDto";

export interface CartDocument extends Document {
    userId: string;
    items: cartItemDto[];
}

const cartModel = new Schema<CartDocument>(
    {
        "userId": {
            required: true,
            type: String,
            unique: true,
            index: true // For better performance on queries
        },
        items: [
            {
                productId: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price:
                    {
                        type: Number,
                        required: true
                    },
                currency:
                    {
                        type: String,
                        required: true
                    },
                quantity:
                    {
                        type: Number,
                        required: true, default: 1
                    },
                image: {
                    type: String,
                    required: false
                },
            },
        ],
    });

const Cart = mongoose.model<CartDocument>("Cart", cartModel);
export default Cart;