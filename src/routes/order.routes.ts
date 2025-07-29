import express from "express";
import { initiatePayment, handlePaymentNotification } from "../controllers/order..controller";

const router = express.Router();

router.post("/pay/:userId", initiatePayment);
router.post("/notify", handlePaymentNotification);

export default router;