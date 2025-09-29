"use client";

import { Product } from "@/types";
import { CardProduct } from "@components/atoms/cardProduct/cardProduct";
import { Carousel } from "primereact/carousel";

type Params = {
  products: Product[];
};

export const FeaturedProducts = ({ products }: Params) => {
  const productTemplate = (product: Product) => {
    if (!products) return null;

    return <CardProduct product={product} key={product.id} showAddToCartButton={false} />;
  };

  return (
    <>
      <Carousel
        value={products}
        numVisible={5}
        numScroll={5}
        className="custom-carousel"
        circular
        autoplayInterval={5000}
        itemTemplate={productTemplate}
      />
    </>
  );
};
