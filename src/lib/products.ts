import { apiFetch } from "@/lib/api";
import { getTokenFromCookies } from "@/lib/auth";
import {
  CreateProduct,
  CreateProductResponse,
  Product,
  ProductResponse,
  UpdateProduct,
} from "@/types";

export const getProducts = async (limit?: number): Promise<ProductResponse> => {
  return apiFetch<ProductResponse>(limit ? `/products?limit=${limit}` : "/products");
};

export const getProductById = async (id: string): Promise<Product> => {
  return apiFetch<Product>(`/products/${id}`);
};

export const createProduct = async (product: CreateProduct): Promise<CreateProductResponse> => {
  const token = await getTokenFromCookies();

  return apiFetch<CreateProductResponse>(
    "/products/image-url",
    {
      method: "POST",
      body: JSON.stringify(product),
    },
    token,
  );
};

export const updateProduct = async (
  product: UpdateProduct,
  productId: string,
): Promise<CreateProductResponse> => {
  const token = await getTokenFromCookies();

  return apiFetch<CreateProductResponse>(
    `/products/image-url/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
    },
    token,
  );
};

export const deleteProduct = async (productId: string): Promise<CreateProductResponse> => {
  const token = await getTokenFromCookies();

  return apiFetch<CreateProductResponse>(
    `/products/${productId}`,
    {
      method: "DELETE",
    },
    token,
  );
};
