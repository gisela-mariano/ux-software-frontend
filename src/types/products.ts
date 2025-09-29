export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  page: number;
  limit: number;
  total: number;
  products: Product[];
};

export type CreateProduct = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export type CreateProductResponse = Product;
