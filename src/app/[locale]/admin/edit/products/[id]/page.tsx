import { EditProductForm } from "@/components/molecules/editProductForm";
import { getProductById } from "@/lib";
import { getTranslations } from "next-intl/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditProductPage({ params }: Params) {
  const { id } = await params;
  const t = await getTranslations("components.editProducts");

  const product = await getProductById(id);

  return (
    <>
      <main className="w-full flex justify-center">
        <div className="m-8 w-lg">
          <h1 className="mb-4 title">{t("title")}</h1>

          <EditProductForm product={product} />
        </div>
      </main>
    </>
  );
}
