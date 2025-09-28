import { apiFetch } from "@/lib/api";
import { getTokenFromCookies } from "@/lib/auth";
import { CreateProduct, CreateProductResponse, Product, ProductResponse } from "@/types";

export const getProducts = async (limit?: number): Promise<ProductResponse> => {
  return apiFetch<ProductResponse>(limit ? `/products?limit=${limit}` : "/products");
};

export const getProductById = async (id: string): Promise<Product> => {
  return apiFetch<Product>(`/products/${id}`);
};

export const createProduct = async (product: CreateProduct): Promise<CreateProductResponse> => {
  const token = await getTokenFromCookies();

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("image", product.image);

  return apiFetch<CreateProductResponse>(
    "/products",
    {
      method: "POST",
      body: formData,
    },
    token,
  );
};
