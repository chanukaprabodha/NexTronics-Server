import { Request, Response } from "express";
import * as cartService from "../services/cart.service";

export const addToCart = async (req: Request, res: Response) => {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Invalid request payload" });
    }

    try {
        const result = await cartService.addToCart(userId, items);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ error: "Failed to add items to cart" });
    }
};
export const updateProductQuantity = async (req: Request, res: Response) => {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    try {
        const cart = await cartService.updateProductQuantity(userId, productId, quantity);
        if (!cart) return res.status(404).json({ error: 'Product not found in cart' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product quantity' });
    }
};

export const removeProductFromCart = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const { productId } = req.params;

    try {
        const cart = await cartService.removeProductFromCart(userId, productId);
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};

export const getCartItems = async (req: Request, res: Response) => {
    const { userId } = req.params; // Extract userId from route parameters

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const cart = await cartService.getCartByUserId(userId);
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};
export const checkout = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        const cart = await cartService.checkout(userId);
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        res.status(200).json({ message: 'Checkout successful', cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to proceed to checkout' });
    }
};