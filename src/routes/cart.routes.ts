import {Router} from "express";
import {
    addToCart,
    checkout,
    getCartItems,
    removeProductFromCart,
    updateProductQuantity
} from "../controllers/cart.controllers";
import {authorizeRoles} from "../middleware/auth.middleware";

const cartRouter: Router = Router();

cartRouter.post('/add',authorizeRoles("customer") ,addToCart);
cartRouter.put('/update/:productId', updateProductQuantity);
cartRouter.delete('/remove/:productId,userId', removeProductFromCart);
cartRouter.get('/get/:userId', authorizeRoles("customer") ,getCartItems);
cartRouter.post('/checkout', authorizeRoles("customer"),checkout);

export default cartRouter;