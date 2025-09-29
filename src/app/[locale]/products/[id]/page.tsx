import { ProductInfo } from "@/components/atoms/productInfo";
import { getProductById } from "@/lib";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductInfoPage({ params }: Params) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <>
      <ProductInfo product={product} />
    </>
  );
}
