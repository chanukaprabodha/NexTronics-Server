import {Router} from "express";
import {
    deleteProduct,
    getAllProducts,
    getProductById,
    saveProduct,
    updateProduct
} from "../controllers/product.controller";
import {authorizeRoles} from "../middleware/auth.middleware";

const productRouter: Router = Router();


productRouter.get("/all", authorizeRoles('admin','customer'), getAllProducts);

productRouter.post("/save", authorizeRoles('admin'), saveProduct);

productRouter.put("/update/:id", authorizeRoles('admin'), updateProduct);

productRouter.delete("/delete/:id", authorizeRoles('admin'), deleteProduct);

productRouter.get("/:id", authorizeRoles('admin','customer'), getProductById);


export default productRouter;