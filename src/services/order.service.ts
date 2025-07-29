import Order from "../model/order.model";
import {OrderDTO} from "../dto/order.dto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export const createOrder = async (orderData: OrderDTO, userId: string) => {
    const order = new Order({...orderData, userId});
    return await order.save();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    return await Order.findByIdAndUpdate(orderId, {status}, {new: true});
};

export const sendOrderConfirmationEmail = async (order: OrderDTO, email: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service provider
        auth: {
            user: EMAIL_USER, // Your email address
            pass: EMAIL_PASS, // Your email password or app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Confirmation",
        html: `
            <h1>Order Confirmation</h1>
            <p>Thank you for your order, ${order.name}!</p>
            <p>Order Details:</p>
            <ul>
                ${order.items
            .map(
                (item) =>
                    `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>`
            )
            .join("")}
            </ul>
            <p>Total Amount: $${order.amount}</p>
            <p>We will deliver your order to: ${order.address}</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};