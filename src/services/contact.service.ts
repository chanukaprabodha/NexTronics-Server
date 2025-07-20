import {Contact} from "../model/contact.model";
import {messageList} from "../db/db";

export const getAllMessages = (): Contact[] => {
    return messageList;
}

export const saveMessage = (message: Contact): Contact => {
    messageList.push(message);
    return message;
}

export const validateMessage = (message: Contact) => {
    if (!message.email || !message.subject || !message.message) {
        return "All fields are required.";
    }
    return null;
}