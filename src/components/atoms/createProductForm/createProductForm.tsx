"use client";

import { createProduct } from "@/lib";
import { createProductSchema } from "@/schemas";
import "@components/atoms/createProductForm/createProductForm.css";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { FileUpload, FileUploadHandlerEvent, FileUploadSelectEvent } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useRef } from "react";

export const CreateProductForm = () => {
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
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
      } catch {
        toastRef.current?.show({
          detail: t("toast.message.error.createProduct.generic"),
          severity: "error",
        });
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

  const erroredData = {
    name: !!(touched.name && errors.name),
    description: !!(touched.description && errors.description),
    image: !!(touched.image && errors.image),
    price: !!(touched.price && errors.price),
  };

  const handleFile = (event: FileUploadHandlerEvent | FileUploadSelectEvent) => {
    const file = event.files[0];
    setFieldValue("image", file);
  };

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
          <label htmlFor="image" className={`${erroredData.image && "error-text"}`}>
            {t("form.label.image")}
          </label>

          <div className="w-full">
            <FileUpload
              name="file"
              url={"/api/upload"}
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">{t("components.addProducts.messages.dragAndDropFile")}</p>
              }
              chooseLabel={t("form.label.chooseImage")}
              onSelect={(e: FileUploadSelectEvent) => handleFile(e)}
            />
          </div>

          {erroredData.image && <small className="error-text">{t(errors.image!)}</small>}
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
