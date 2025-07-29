import { Request, Response } from "express";
import {createOrder, sendOrderConfirmationEmail, updateOrderStatus} from "../services/order.service";
import { OrderDTO } from "../dto/order.dto";
import dotenv from "dotenv";
import Product from "../model/product.model";

dotenv.config();

const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID;
export const initiatePayment = async (req: Request,
                                      res: Response) => {

    const orderData: OrderDTO = req.body;
    const userId = req.params.userId;

    console.log("Order Data in controller: ",orderData);
    console.log("User Id: ",userId);
    console.log("Merchant ID: ", PAYHERE_MERCHANT_ID);

    try {
        const order = await createOrder(orderData, userId);

        // Send confirmation email
        await sendOrderConfirmationEmail(orderData, orderData.email);

        const paymentRequest = {
            sandbox: true,
            merchant_id: PAYHERE_MERCHANT_ID,
            return_url: "http://localhost:3000/payment-success",
            cancel_url: "http://localhost:3000/payment-cancel",
            notify_url: "http://localhost:5000/api/order/notify",
            order_id: order._id,
            items: order.items.map((item) => item.name).join(", "),
            amount: order.amount,
            currency: "LKR",
            first_name: order.name,
            last_name: "",
            email: order.email,
            phone: order.phone,
            address: order.address,
            city: "Colombo",
        };

        res.json({ paymentRequest });
    } catch (error) {
        res.status(500).json({ message: "Failed to initiate payment", error });
    }
};

export const handlePaymentNotification = async (req: Request, res: Response) => {
    const { order_id, status_code } = req.body;

    if (status_code === "2") {
        await updateOrderStatus(order_id, "Completed");
    } else {
        await updateOrderStatus(order_id, "Failed");
    }

    res.status(200).send("OK");
};