import express, {Express} from "express";
import productRoutes from "./routes/products.routes";
import cors from 'cors';
import contactRoutes from "./routes/contact.routes";
import authRoutes from "./routes/auth.routes";
import {authenticateToken} from "./middleware/auth.middleware";

const app: Express = express();

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173"
];


const corsOptions = {
    origin: (origin: string | undefined,
             callback: (err: Error | null,
                        allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOptions));

app.use("/api/products",authenticateToken, productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth",authRoutes);

export default app;