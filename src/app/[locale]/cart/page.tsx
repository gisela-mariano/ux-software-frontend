import { CartList } from "@/components/organisms/cartList";
import { getTranslations } from "next-intl/server";

export default async function Cart() {
  const t = await getTranslations("components.cart");

  return (
    <div className="px-8">
      <h1 className="my-4 text-(--text-color) font-bold text-4xl">{t("yourItems")}</h1>

      <CartList />
    </div>
  );
}
