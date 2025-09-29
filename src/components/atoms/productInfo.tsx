"use client";

import { useAuthStore } from "@/stores";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types";
import { currencyMapper, DOLLAR_VALUE } from "@/utils/constants";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "primereact/button";
import { useRef } from "react";

type Params = {
  product: Product;
};

export const ProductInfo = ({ product }: Params) => {
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();
  const toastRef = useRef<ToastHandle>(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);
  const cartProduct = useCartStore((state) => state.cartProduct);

  const currency = currencyMapper[locale];

  const price = locale === "pt" ? product.price * DOLLAR_VALUE : product.price;

  const formattedPrice = format.number(price, { style: "currency", currency });

  const isInCart = cartProduct.items?.some((item) => item.product.id === product.id);

  const handleAddProductToCart = async () => {
    if (!isAuthenticated) {
      toastRef.current?.show({
        detail: t("toast.message.error.cantAddProductToCart"),
        severity: "error",
      });

      return;
    }

    try {
      await addProductToCart({ productId: product.id, quantity: 1 });

      toastRef.current?.show({
        detail: t("toast.message.success.addProductToCart"),
        severity: "success",
      });
    } catch {
      toastRef.current?.show({
        detail: t("toast.message.error.removeProductFromCart"),
        severity: "error",
      });
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeProductFromCart(product.id);

      toastRef.current?.show({
        detail: t("toast.message.success.removeProductFromCart"),
        severity: "success",
      });
    } catch {
      toastRef.current?.show({
        detail: t("toast.message.error.removeProductFromCart"),
        severity: "error",
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />

      <main className="p-8 flex gap-8 w-full">
        <div className="flex justify-center">
          <Image
            alt={product.name}
            src={product.imageUrl}
            width={250}
            height={350}
            style={{ objectFit: "contain" }}
            className="w-80"
          />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col max-w-8/10">
            <h1 className="text-(--text-color) font-bold text-3xl mb-2 text-ellipsis max-w-100">
              {product.name}
            </h1>
            <p className="text-(--help-text-color)">{product.description}</p>
          </div>

          <footer className="flex flex-col gap-2 items-end self-end justify-self-end">
            <span className="font-bold">{formattedPrice}</span>

            <Button label={t("buttons.addToCart")} onClick={handleAddProductToCart} />
            <Button
              label={t("buttons.removeFromCart")}
              outlined
              disabled={!isInCart}
              onClick={handleRemoveFromCart}
            />
          </footer>
        </div>
      </main>
    </>
  );
};
