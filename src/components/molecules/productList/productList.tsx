"use client";

import { CardProduct } from "@/components/atoms/cardProduct/cardProduct";
import { Product } from "@/types/products";
import "@components/molecules/productList/productList.css";
import { DataView } from "primereact/dataview";

type Params = {
  products: Product[];
};

export const ProductList = ({ products }: Params) => {
  const listTemplate = (products: Product[]) => {
    if (!products || products.length === 0) return null;

    return (
      <div className={`cont-items grid`}>
        {products.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="product-list">
      <DataView value={products} listTemplate={listTemplate} layout="grid" paginator rows={10} />
    </div>
  );
};
