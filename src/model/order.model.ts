import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        items: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
            },
        ],
        status: {
            type: String,
            default: "Pending"
        },
    },
    {timestamps: true}
);

export default mongoose.model("Order", OrderSchema);