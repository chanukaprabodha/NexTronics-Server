import {Request, Response} from "express";
import * as contactService from "../services/contact.service";

export const getAllMessages = (req: Request,
                               res: Response) => {
    try {
        const allMessages = contactService.getAllMessages();
        res.status(200).json(allMessages);
    } catch (e) {
        console.error("Error fetching messages:", e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const saveMessage = (req: Request,
                            res: Response) => {
    try {
        const newMessage = req.body;
        const validationError = contactService.validateMessage(newMessage);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }
        const savedMessage = contactService.saveMessage(newMessage);
        res.status(201).json(savedMessage);
    } catch (e) {
        console.error("Error saving message:", e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}