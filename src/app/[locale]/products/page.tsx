import { FeaturedProducts } from "@/components/atoms/featuredProducts";
import { ProductList } from "@/components/molecules/productList/productList";
import { getProducts } from "@/lib";
import { getTranslations } from "next-intl/server";

export default async function Products() {
  const { products } = await getProducts(100);
  const t = await getTranslations("components.products");

  const featuredProducts = products.slice(0, 15);

  return (
    <main className="m-8 flex flex-col gap-4">
      <section>
        <h1 className="mb-4 text-(--text-color) font-bold text-4xl">{t("featuredProducts")}</h1>
        <FeaturedProducts products={featuredProducts} />
      </section>

      <section>
        <h1 className="my-4 text-(--text-color) font-bold text-4xl">{t("title")}</h1>
        <ProductList products={products} />
      </section>
    </main>
  );
}
