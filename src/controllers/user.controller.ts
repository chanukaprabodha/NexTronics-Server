import {Request, Response} from 'express';
import {UserDto} from '../dto/user.dto';
import * as userService from '../services/user.service';
import nodemailer from "nodemailer";

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const userData: UserDto = req.body;
        const user = await userService.registerUser(userData);

        console.log(user);

        // Send a welcome email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Welcome to Our System',
            html: `
                    <html>
                        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px;">
                                <h2 style="color: #333;">Welcome to <span style="color: #007BFF;">NexTronics</span>, ${user.name}!</h2>
                                <p>We're thrilled to have you join our community. Your account has been successfully created, and you're now part of a growing network of innovators.</p>
                                <p>If you ever need help or have any questions, don’t hesitate to reach out to us.</p>
                                <p style="margin-top: 30px;">Thanks again for signing up — we’re excited to have you with us!</p>
                                <p style="font-weight: bold;">– The NexTronics Team</p>
                            </div>
                        </body>
                    </html>
                    `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (e) {
            console.error('Error sending welcome email:', e);
        }

        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({message: 'User already exists'});
        } else {
            res.status(500).json({message: 'Internal server error'});
        }
    }
}

export const getUserById = async (req: Request,
                                  res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
        res.status(400).json({
            error: "Invalid user ID"
        });
        return;
    }

    const user = await userService.getUserById(userId);

    if (!user) {
        res.status(404).json({
            error: "User not found"
        });
        return;
    }

    res.status(200).json(user);

}
