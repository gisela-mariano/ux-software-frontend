import {
  createProduct,
  deleteProduct as deleteProductService,
  getProducts as getProductsService,
  updateProduct,
} from "@/lib";
import { CreateProduct, Product, UpdateProduct } from "@/types";
import { create } from "zustand";

type ProductsState = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProductsList: () => Promise<void>;
  getProducts: () => Promise<void>;
  createProduct: (product: CreateProduct) => Promise<void>;
  updateProduct: (product: UpdateProduct, productId: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  updateProductsList: async () => {
    await get().getProducts();
  },

  getProducts: async () => {
    const { products } = await getProductsService(100);
    set({ products });
  },

  createProduct: async (product: CreateProduct) => {
    await createProduct(product);
    await get().updateProductsList();
  },

  updateProduct: async (product, productId) => {
    await updateProduct(product, productId);
    await get().updateProductsList();
  },

  deleteProduct: async (id) => {
    await deleteProductService(id);
    await get().updateProductsList();
  },
}));
