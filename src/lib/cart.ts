import { apiFetch } from "@/lib/api";
import { getTokenFromCookies } from "@/lib/auth";
import {
  AddProductToCart,
  CartProductResponse,
  CartResponse,
  DecreaseProductQuantityFromCart,
  RemoveProductFromCart,
  RemoveProductFromCartResponse,
} from "@/types";

export const getCartProducts = async (): Promise<CartResponse> => {
  const token = await getTokenFromCookies();

  return apiFetch<CartResponse>("/cart", {}, token);
};

export const addProductToCart = async (product: AddProductToCart) => {
  const token = await getTokenFromCookies();

  return apiFetch<CartProductResponse>(
    "/cart/add-product",
    {
      method: "POST",
      body: JSON.stringify(product),
    },
    token,
  );
};

export const removeProductFromCart = async (product: RemoveProductFromCart) => {
  const token = await getTokenFromCookies();

  return apiFetch<RemoveProductFromCartResponse>(
    "/cart/remove-product",
    {
      method: "DELETE",
      body: JSON.stringify(product),
    },
    token,
  );
};

export const decreaseProductQuantityFromCart = async (product: DecreaseProductQuantityFromCart) => {
  const token = await getTokenFromCookies();

  return apiFetch<CartProductResponse>(
    "/cart/decrease-quantity",
    {
      method: "PATCH",
      body: JSON.stringify(product),
    },
    token,
  );
};
