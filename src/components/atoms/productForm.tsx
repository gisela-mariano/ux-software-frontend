"use client";

import { createProductSchema } from "@/schemas";
import { CreateProduct, Product } from "@/types";
import "@components/atoms/createProductForm/createProductForm.css";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";

type Props = {
  initialValues?: Partial<Product>;
  mode?: "create" | "update";
  onSubmit: (values: CreateProduct) => void;
  onDelete?: () => Promise<void> | void;
};

export const ProductForm = ({ initialValues, mode, onSubmit, onDelete }: Props) => {
  const t = useTranslations();
  const [isValidImage, setIsValidImage] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      imageUrl: initialValues?.imageUrl || "",
      price: initialValues?.price || 0,
    },
    validationSchema: createProductSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

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
          <label htmlFor="imageUrl" className={`${erroredData.imageUrl && "error-text"}`}>
            {t("form.label.imageUrl")}
          </label>

          <InputText
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl}
            placeholder={t("form.label.imageUrl")}
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
            placeholder="00.00"
            invalid={erroredData.price}
            onValueChange={(e) => setFieldValue("price", e.value)}
          />

          {erroredData.price && <small className="error-text">{t(errors.price!)}</small>}
        </div>

        {mode === "create" ? (
          <Button className="mt-4!" label={t("buttons.add")} type="submit" />
        ) : (
          <div className="mt-4! flex gap-4 justify-end">
            <Button
              label={t("buttons.removeProduct")}
              outlined
              onClick={(e) => {
                e.preventDefault();
                if (onDelete) onDelete();
              }}
            />
            <Button label={t("buttons.edit")} type="submit" />
          </div>
        )}
      </form>
    </>
  );
};
