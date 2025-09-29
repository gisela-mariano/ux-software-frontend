"use client";

import { useCartStore } from "@/stores/cartStore";
import { CartProduct } from "@/types";
import { currencyMapper, DOLLAR_VALUE } from "@/utils/constants";
import "@components/atoms/cardProduct/cardProduct.css";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

type Params = {
  cartProduct: CartProduct;
};

export const CardCartProduct = ({ cartProduct }: Params) => {
  const { product, itemTotal, quantity: productQuantity } = cartProduct;

  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();
  const [quantity, setQuantity] = useState(productQuantity || 0);
  const toastRef = useRef<ToastHandle>(null);
  const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);
  const decreaseProductQuantityFromCart = useCartStore(
    (state) => state.decreaseProductQuantityFromCart,
  );

  const handleChangeQuantity = async (e: InputNumberChangeEvent) => {
    setIsLoadingQuantity(true);

    const newValue = e.value ?? 0;

    try {
      if (newValue > quantity) {
        await addProductToCart({
          productId: product.id,
          quantity: newValue - quantity,
        });
      } else if (newValue < quantity) {
        await decreaseProductQuantityFromCart({
          productId: product.id,
          quantity: quantity - newValue,
        });
      }

      setQuantity(newValue);
    } catch {
      setQuantity(quantity);

      toastRef.current?.show({ detail: t("toast.message.error.updateCartProductQuantity") });
    }

    setIsLoadingQuantity(false);
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeProductFromCart(product.id);
    } catch {
      toastRef.current?.show({ detail: t("toast.message.error.removeProductFromCart") });
    }
  };

  const currency = currencyMapper[locale];

  const price = locale === "pt" ? itemTotal * DOLLAR_VALUE : itemTotal;

  const formattedTotal = format.number(price, { style: "currency", currency });

  return (
    <>
      <Toast ref={toastRef} severity="error" />

      <Tooltip target=".custom-target-tooltip" />

      <div className={`card horizontal rounded-2xl`}>
        <div className="card__cont-image">
          <Image alt={product.name} src={product.imageUrl} width={150} height={150} />
        </div>

        <main className="card__main">
          <h2 className="text-ellipsis">{product.name}</h2>

          <footer className="card__footer">
            <span className="custom-target-tooltip" data-pr-tooltip={formattedTotal}>
              {formattedTotal}
            </span>
            <div className="flex flex-col gap-3 items-end">
              <i
                className="pi pi-trash text-(--primary-color) cursor-pointer"
                onClick={handleRemoveFromCart}
              />

              <InputNumber
                name="quantity"
                value={quantity}
                onChange={(e: InputNumberChangeEvent) => handleChangeQuantity(e)}
                showButtons
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-outlined"
                disabled={isLoadingQuantity}
                incrementButtonIcon={isLoadingQuantity ? "pi pi-spin pi-spinner" : "pi pi-plus"}
                decrementButtonIcon={
                  isLoadingQuantity
                    ? "pi pi-spin pi-spinner"
                    : quantity === 1
                    ? "pi pi-trash"
                    : "pi pi-minus"
                }
                min={0}
                size={1}
              />
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};
