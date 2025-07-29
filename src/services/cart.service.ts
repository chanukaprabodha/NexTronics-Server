import Cart, { CartDocument } from "../model/cart.model";

export const addToCart = async (userId: string, items: any[]) => {
  const existingCart: CartDocument | null = await Cart.findOne({ userId });
  if (existingCart) {
    existingCart.items = items;
    return await existingCart.save();
  } else {
    const newCart = new Cart({ userId, items });
    return await newCart.save();
  }
};

export const updateProductQuantity = async (userId: string, productId: string, quantity: number) => {
  const cart: CartDocument | null = await Cart.findOne({ userId });

  if (!cart) return null;

  const item = cart.items.find(item => item.productId.toString() === productId);

  if (item) {
    item.quantity = quantity;
    return await cart.save();
  }

  return null;
};

export const removeProductFromCart = async (userId: string, productId: string) => {
  const cart: CartDocument | null = await Cart.findOne({ userId });

  if (!cart) return null;

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  return await cart.save();
};

export const getCartByUserId = async (userId: string) => {
  return await Cart.findOne({ userId });
};

export const checkout = async (userId: string) => {
  const cart: CartDocument | null = await Cart.findOne({ userId });

  if (!cart) return null;

  // Clear the cart after checkout
  cart.items = [];
  return await cart.save();
};