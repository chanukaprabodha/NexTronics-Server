import { Router } from "express";
import upload from "../middleware/upload.middleware";

const uploadRouter: Router = Router();

// Route for file upload
uploadRouter.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({
        message: "File uploaded successfully",
        filePath: `/uploads/${req.file.filename}`,
    });
});

export default uploadRouter;