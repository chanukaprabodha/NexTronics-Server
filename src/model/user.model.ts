import mongoose, {Document} from "mongoose";

export interface UserDocument extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    address: string;
    phone: string;
}

const userModel = new mongoose.Schema({
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
    "email": {
        required: true,
        type: String,
        unique: true
    },
    "password": {
        required: true,
        type: String
    },
    "role": {
        type: String,
        default: 'customer'
    },
    "active": {
        type: Boolean,
        default: true
    },
    "address": {
        type: String,
        default: ''
    },
    "phone": {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userModel);

export default User;