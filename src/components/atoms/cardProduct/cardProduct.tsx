"use client";

import { useAuthStore } from "@/stores";
import { useCartStore } from "@/stores/cartStore";
import { UserRoles } from "@/types";
import { Product } from "@/types/products";
import { currencyMapper, DOLLAR_VALUE } from "@/utils/constants";
import "@components/atoms/cardProduct/cardProduct.css";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef, useState } from "react";

type Params = {
  product: Product;
};

export const CardProduct = ({ product }: Params) => {
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();
  const toastRef = useRef<ToastHandle>(null);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.role);

  const currency = currencyMapper[locale];

  const price = locale === "pt" ? product.price * DOLLAR_VALUE : product.price;

  const formattedPrice = format.number(price, { style: "currency", currency });

  const handleGoToProductInfo = () => {
    router.push(`/products/${product.id}`);
  };

  const handleGoToEditPage = () => {
    router.push(`/admin/edit/products/${product.id}`);
  };

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Toast ref={toastRef} />

      <Tooltip target=".custom-target-tooltip" />

      <div
        className={"card vertical rounded-2xl cursor-pointer"}
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          handleGoToProductInfo();
        }}
      >
        <div className="card__cont-image">
          <Image alt={product.name} src={product.imageUrl} width={150} height={150} />

          {isMounted && userRole === UserRoles.ADMIN && (
            <Button
              icon="pi pi-pencil"
              className="card__action-btn"
              rounded
              size="small"
              tooltip={t("buttons.edit")}
              onClick={(e) => {
                e.stopPropagation();
                handleGoToEditPage();
              }}
            />
          )}
        </div>

        <main className="card__main">
          <h2 className="text-ellipsis">{product.name}</h2>

          <footer className="card__footer">
            <span className="custom-target-tooltip" data-pr-tooltip={formattedPrice}>
              {formattedPrice}
            </span>

            <Button
              icon="pi pi-cart-plus"
              rounded
              tooltip={t("buttons.addToCart")}
              onClick={(e) => {
                e.stopPropagation();
                handleAddProductToCart();
              }}
            />
          </footer>
        </main>
      </div>
    </>
  );
};
