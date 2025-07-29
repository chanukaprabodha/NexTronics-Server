import {Request, Response} from "express";
import * as authService from "../services/auth.service";

export const authenticateUser = async (req: Request,
                                 res: Response) => {
    const {email: email, password} = req.body;
    const authTokens = await authService.authenticateUser(email, password);

    if (!authTokens) {
        res.status(401).json({
            error: "Invalid credentials"
        })
        return;
    }
    res.json(authTokens);

}