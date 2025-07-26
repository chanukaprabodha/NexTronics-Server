import {Router} from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct
} from "../controllers/product.controller";
import {authorizeRoles} from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const productRouter: Router = Router();

// 1.Handle Requests to /api/products

// 1.1 GET all products
productRouter.get("/all", authorizeRoles('admin','customer'), getAllProducts);

// 1.2 Save a new product
productRouter.post("/save", authorizeRoles('admin'), upload.single("image"),saveProduct);

// 1.3 Update an existing product
productRouter.put("/update/:id", authorizeRoles('admin'),upload.single("image"), updateProduct);

// 1.4 Delete a product
productRouter.delete("/delete/:id", authorizeRoles('admin'), deleteProduct);

// 1.5 Get a product by ID
productRouter.get("/:id", getProductById);

// 2. export the router
export default productRouter;