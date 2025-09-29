"use client";

import { createProduct, getProducts } from "@/lib";
import { CreateProduct } from "@/types";
import { ProductForm } from "@components/atoms/productForm";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export const CreateProductForm = () => {
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);

  const handleCreate = async (values: CreateProduct) => {
    try {
      await createProduct(values);
      await getProducts(100);

      toastRef.current?.show({
        detail: t("toast.message.success.createProduct"),
        severity: "success",
      });
    } catch {
      toastRef.current?.show({
        detail: t("toast.message.error.createProduct.generic"),
        severity: "error",
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />

      <ProductForm onSubmit={handleCreate} mode="create" />
    </>
  );
};
