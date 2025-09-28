"use client";

import { useCartStore } from "@/stores/cartStore";
import { CartProduct } from "@/types";
import { currencyMapper, DOLLAR_VALUE } from "@/utils/constants";
import { CardCartProduct } from "@components/atoms/cardProduct/cardCartProduct";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import { useEffect, useRef } from "react";

export const CartList = () => {
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);
  const locale = useLocale();
  const format = useFormatter();

  const getCartProducts = useCartStore((state) => state.getCartProducts);
  const userCart = useCartStore((state) => state.cartProduct);

  const price = locale === "pt" ? userCart.totalPrice * DOLLAR_VALUE : userCart.totalPrice;
  const currency = currencyMapper[locale];

  const formattedTotalValue = format.number(price, { style: "currency", currency });

  const listTemplate = (cartProducts: CartProduct[]) => {
    if (!cartProducts || cartProducts.length === 0) return null;

    return (
      <div className={`cont-items`}>
        {cartProducts.map((cartProduct) => (
          <CardCartProduct cartProduct={cartProduct} key={cartProduct.product.id} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  const handleCompletePurchase = () => {
    toastRef.current?.show();
  };

  return (
    <>
      <Toast
        ref={toastRef}
        severity="success"
        summary={t("toast.summary.success")}
        detail={t("components.cart.toast.detail.success.completePurchase")}
      />
      <section className="p-4 border border-(--border-color) rounded-2xl ">
        <DataView value={userCart.items} listTemplate={listTemplate} />

        <footer className="flex flex-col gap-2 items-end">
          <Divider />

          <span>{t("components.cart.totalValue")}</span>
          <span className="text-(--text-color) font-bold text-2xl">{formattedTotalValue}</span>
          <Button label={t("components.cart.completePurchase")} onClick={handleCompletePurchase} />
        </footer>
      </section>
    </>
  );
};
