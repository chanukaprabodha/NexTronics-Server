import { Request, Response } from 'express';
import { UserDto } from '../dto/user.dto';
import * as userService from '../services/user.service';

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const userData: UserDto = req.body;
        const user = await userService.registerUser(userData);
        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
