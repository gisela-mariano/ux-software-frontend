import { Product } from "@/types/products";

export type CartProduct = {
  product: Product;
  quantity: number;
  itemTotal: number;
};

export type CartResponse = {
  cartId: string;
  userId: string;
  items: CartProduct[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type AddProductToCart = {
  productId: string;
  quantity: number;
};

export type RemoveProductFromCart = {
  productId: string;
};

export type DecreaseProductQuantityFromCart = {
  productId: string;
  quantity: number;
};

export type CartProductResponse = {
  product: Product;
  quantity: number;
};

export type RemoveProductFromCartResponse = {
  product: Product;
};
