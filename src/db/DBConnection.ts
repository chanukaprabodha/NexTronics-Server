import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DBConnection = async () => {
    try {
        const connection = await mongoose.connect(MONGO_DB_URL as string);
        return `Successfully connected to the database: ${connection.connection?.host}`;
    } catch (e) {
        return "MongoDB connection error: " + e;
    }
}

export default DBConnection;