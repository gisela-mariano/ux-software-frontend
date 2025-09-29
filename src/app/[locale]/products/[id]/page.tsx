import { ProductInfo } from "@/components/atoms/productInfo";
import { getProductById } from "@/lib";

type Params = {
  params: {
    id: string;
  };
};

export default async function ProductInfoPage({ params }: Params) {
  const { id } = params;

  const product = await getProductById(id);

  return (
    <>
      <ProductInfo product={product} />
    </>
  );
}
