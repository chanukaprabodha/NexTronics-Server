import User, {UserDocument} from "../model/user.model";
import { UserDto } from "../dto/user.dto";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();

export const authenticateUser = async (email: string,
                                 password: string) => {

    const existingUser: UserDocument | null =await User.findOne({email: email});

    if (!existingUser) {
        return null;
    }

    const isValidPassword = bcrypt.compareSync(password, <string>existingUser.password);

    if (!isValidPassword) {
        return null;
    }

    const accessToken = jwt.sign({
        id: existingUser.id,
        name: existingUser.name,
        role: existingUser.role
    }, JWT_SECRET, {
        expiresIn: "1d"
    });

    const refreshToken = jwt.sign({
        name: existingUser.name
    }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });

    return {accessToken, refreshToken}
}