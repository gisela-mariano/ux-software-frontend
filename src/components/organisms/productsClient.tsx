"use client";

import { FeaturedProducts } from "@/components/atoms/featuredProducts";
import { ProductList } from "@/components/molecules/productList/productList";
import { useProductStore } from "@/stores";
import { Product } from "@/types";
import { useEffect } from "react";
import { useTranslations } from "use-intl";

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const t = useTranslations("components.products");

  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  const featuredProducts = products.slice(0, 15);

  return (
    <main className="m-8 flex flex-col gap-4">
      <section>
        <h1 className="mb-4 title">{t("featuredProducts")}</h1>
        <FeaturedProducts products={featuredProducts} />
      </section>

      <section>
        <h1 className="my-4 title">{t("title")}</h1>
        <ProductList products={products} />
      </section>
    </main>
  );
}
