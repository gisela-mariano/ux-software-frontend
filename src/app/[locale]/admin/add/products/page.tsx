import { CreateProductForm } from "@components/molecules/createProductForm";
import { getTranslations } from "next-intl/server";

export default async function AdminAddProductPage() {
  const t = await getTranslations("components.addProducts");

  return (
    <>
      <main className="w-full flex justify-center">
        <div className="m-8 w-lg">
          <h1 className="mb-4 title">{t("title")}</h1>

          <CreateProductForm />
        </div>
      </main>
    </>
  );
}
