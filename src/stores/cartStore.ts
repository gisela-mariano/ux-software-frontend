import {
  addProductToCart as addProductToCartApi,
  decreaseProductQuantityFromCart as decreaseProductQuantityFromCartApi,
  getCartProducts as getCartProductsAPi,
  removeProductFromCart as removeProductFromCartApi,
} from "@/lib/cart";
import { AddProductToCart, CartResponse, DecreaseProductQuantityFromCart } from "@/types";
import { create } from "zustand";

interface CartState {
  cartProductQuantity: number;
  cartProduct: CartResponse;
  getCartProducts: () => Promise<void>;
  updateCartProductQuantity: () => Promise<void>;
  setCartProduct: (cartProduct: CartResponse) => void;
  setCartProductQuantity: (quantity: number) => void;
  addProductToCart: (product: AddProductToCart) => Promise<void>;
  removeProductFromCart: (productId: string) => Promise<void>;
  decreaseProductQuantityFromCart: (product: DecreaseProductQuantityFromCart) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartProduct: {} as CartResponse,
  cartProductQuantity: 0,

  setCartProduct: (cartProduct: CartResponse) => set({ cartProduct }),

  setCartProductQuantity: (quantity: number) =>
    set({ cartProductQuantity: quantity >= 0 ? quantity : 0 }),

  getCartProducts: async () => {
    const res = await getCartProductsAPi();
    set({ cartProduct: res, cartProductQuantity: res.totalItems });
  },

  updateCartProductQuantity: async () => {
    await get().getCartProducts();
  },

  addProductToCart: async (product: AddProductToCart) => {
    await addProductToCartApi(product);
    await get().updateCartProductQuantity();
  },

  removeProductFromCart: async (productId: string) => {
    await removeProductFromCartApi({ productId });
    await get().updateCartProductQuantity();
  },

  decreaseProductQuantityFromCart: async (product: DecreaseProductQuantityFromCart) => {
    await decreaseProductQuantityFromCartApi(product);
    await get().updateCartProductQuantity();
  },
}));
