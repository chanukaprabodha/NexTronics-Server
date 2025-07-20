import {Router} from "express";
import {getAllMessages, saveMessage} from "../controllers/contact.controller";

const contactRouter: Router = Router();

contactRouter.get("/all", getAllMessages);

contactRouter.post("/save", saveMessage);

export default contactRouter;

