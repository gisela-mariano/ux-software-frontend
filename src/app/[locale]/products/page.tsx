import ProductsClient from "@/components/organisms/productsClient";
import { getProducts } from "@/lib";

export default async function Products() {
  const { products } = await getProducts(100);

  return <ProductsClient initialProducts={products} />;
}
