"use client";

import { deleteProduct, getProducts, updateProduct } from "@/lib";
import { Product, UpdateProduct } from "@/types";
import { ProductForm } from "@components/atoms/productForm";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Params = {
  product: Product;
};

export const EditProductForm = ({ product }: Params) => {
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);
  const router = useRouter();

  const handleEdit = async (values: UpdateProduct) => {
    try {
      await updateProduct(values, product.id);

      toastRef.current?.show({
        detail: t("toast.message.success.updateProduct"),
        severity: "success",
      });
    } catch {
      toastRef.current?.show({
        detail: t("toast.message.error.updateProduct.generic"),
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);

      toastRef.current?.show({
        detail: t("toast.message.success.deleteProduct"),
        severity: "success",
      });

      await getProducts(100);

      router.push("/");
    } catch {
      toastRef.current?.show({
        detail: t("toast.message.error.deleteProduct.generic"),
        severity: "error",
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />

      <ProductForm
        onSubmit={handleEdit}
        mode="update"
        initialValues={product}
        onDelete={handleDelete}
      />
    </>
  );
};
