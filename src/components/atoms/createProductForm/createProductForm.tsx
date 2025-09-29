"use client";

import { createProduct } from "@/lib";
import { createProductSchema } from "@/schemas";
import "@components/atoms/createProductForm/createProductForm.css";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";

export const CreateProductForm = () => {
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);
  const [isValidImage, setIsValidImage] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
    },
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      try {
        await createProduct(values);

        toastRef.current?.show({
          detail: t("toast.message.success.createProduct"),
          severity: "success",
        });

        resetForm();
      } catch {
        toastRef.current?.show({
          detail: t("toast.message.error.createProduct.generic"),
          severity: "error",
        });
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

  const erroredData = {
    name: !!(touched.name && errors.name),
    description: !!(touched.description && errors.description),
    imageUrl: !!(touched.imageUrl && errors.imageUrl),
    price: !!(touched.price && errors.price),
  };

  const selectedImageContent = isValidImage ? (
    <div className="mt-4">
      <Image
        alt="product image"
        src={values.imageUrl}
        width={100}
        height={100}
        style={{ objectFit: "contain" }}
      />
    </div>
  ) : null;

  useEffect(() => {
    if (!values.imageUrl) {
      setIsValidImage(false);
      return;
    }

    const img = new window.Image();
    img.src = values.imageUrl;

    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
  }, [values.imageUrl]);

  return (
    <>
      <Toast ref={toastRef} />

      <form className="cont-form" onSubmit={handleSubmit}>
        <div className="cont-input">
          <label htmlFor="productName" className={`${erroredData.name && "error-text"}`}>
            {t("form.label.productName")}
          </label>

          <InputText
            id="productName"
            name="name"
            value={values.name}
            placeholder={t("form.label.productName")}
            invalid={erroredData.name}
            onChange={handleChange}
          />

          {erroredData.name && <small className="error-text">{t(errors.name!)}</small>}
        </div>

        <div className="cont-input">
          <label htmlFor="description" className={`${erroredData.description && "error-text"}`}>
            {t("form.label.description")}
          </label>

          <InputTextarea
            id="description"
            name="description"
            value={values.description}
            placeholder={t("form.label.description")}
            invalid={erroredData.description}
            onChange={handleChange}
          />

          {erroredData.description && (
            <small className="error-text">{t(errors.description!)}</small>
          )}
        </div>

        <div className="cont-input">
          <label htmlFor="image" className={`${erroredData.imageUrl && "error-text"}`}>
            {t("form.label.image")}
          </label>

          <InputText
            id="image"
            name="imageUrl"
            value={values.imageUrl}
            placeholder={t("form.label.image")}
            invalid={erroredData.imageUrl}
            onChange={handleChange}
          />

          {selectedImageContent}

          {erroredData.imageUrl && <small className="error-text">{t(errors.imageUrl!)}</small>}
        </div>

        <div className="cont-input">
          <label htmlFor="price" className={`${erroredData.price && "error-text"}`}>
            {t("form.label.price")}
          </label>

          <InputNumber
            id="price"
            name="price"
            value={values.price}
            mode="decimal"
            minFractionDigits={2}
            placeholder="00,00"
            invalid={erroredData.price}
            onValueChange={(e) => setFieldValue("price", e.value)}
          />

          {erroredData.price && <small className="error-text">{t(errors.price!)}</small>}
        </div>

        <Button className="mt-4!" label={t("buttons.add")} type="submit" />
      </form>
    </>
  );
};
