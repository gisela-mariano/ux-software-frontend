import { CreateProductForm } from "@/components/atoms/createProductForm/createProductForm";
import { getTranslations } from "next-intl/server";

export default async function AdminProductsPage() {
  const t = await getTranslations("components.addProducts");

  return (
    <>
      <main className="w-full flex justify-center">
        <div className="m-8 w-lg">
          <h1 className="mb-4 text-(--text-color) font-bold text-4xl">{t("title")}</h1>

          <CreateProductForm />
        </div>
      </main>
    </>
  );
}
