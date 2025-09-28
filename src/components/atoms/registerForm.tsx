"use client";

import { useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib";
import { createUser } from "@/lib/auth";
import { registerSchema } from "@/schemas/register";
import { useAuthStore } from "@/stores";
import { mapErrorMessage } from "@/utils/mapErrorMessages";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

type FieldType = "password" | "text";

export const RegisterForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const [passwordConfig, setPasswordConfig] = useState({
    password: "password" as FieldType,
    confirmPassword: "password" as FieldType,
    icon: "pi-eye",
    tooltip: "components.login.tooltip.showPassword",
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      cpf: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await createUser({
          cpf: values.cpf,
          email: values.email,
          name: values.fullName,
          password: values.password,
          phone: values.phone,
        });

        toastRef.current?.show({
          detail: t("toast.message.success.userRegistration"),
          severity: "success",
        });

        setAuthenticated(true);

        router.push("/");
      } catch (error) {
        const message = mapErrorMessage((error as ApiError).message);

        toastRef.current?.show({ detail: t(message), severity: "error" });
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const erroredData = {
    fullName: !!(touched.fullName && errors.fullName),
    cpf: !!(touched.cpf && errors.cpf),
    phone: !!(touched.phone && errors.phone),
    email: !!(touched.email && errors.email),
    password: !!(touched.password && errors.password),
    confirmPassword: !!(touched.confirmPassword && errors.confirmPassword),
  };

  const handleShowPassword = (field: "password" | "confirmPassword") => {
    setPasswordConfig((prev) => {
      const isHidden = prev[field] === "password";

      return {
        ...prev,
        [field]: isHidden ? "text" : "password",
        icon: prev.icon === "pi-eye" ? "pi-eye-slash" : "pi-eye",
        tooltip:
          prev.tooltip === "components.login.tooltip.showPassword"
            ? "components.login.tooltip.hidePassword"
            : "components.login.tooltip.showPassword",
      };
    });
  };

  return (
    <>
      <Toast ref={toastRef} />

      <Tooltip target=".custom-target-tooltip" />

      <form className="cont-form" onSubmit={handleSubmit}>
        <div className="cont-input">
          <label htmlFor="fullName" className={`${erroredData.fullName && "error-text"}`}>
            {t("form.label.fullName")}
          </label>

          <InputText
            id="fullName"
            name="fullName"
            value={values.fullName}
            placeholder={t("form.placeholder.fullName")}
            invalid={erroredData.fullName}
            onChange={handleChange}
          />

          {erroredData.fullName && <small className="error-text">{t(errors.fullName!)}</small>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="cont-input">
            <label htmlFor="cpf" className={`${erroredData.cpf && "error-text"}`}>
              {t("form.label.cpf")}
            </label>

            <InputMask
              id="cpf"
              name="cpf"
              mask="999.999.999-99"
              unmask
              value={values.cpf}
              placeholder="000.000.000-00"
              invalid={erroredData.cpf}
              onChange={handleChange}
            />

            {erroredData.cpf && <small className="error-text">{t(errors.cpf!)}</small>}
          </div>

          <div className="cont-input">
            <label htmlFor="phone" className={`${erroredData.phone && "error-text"}`}>
              {t("form.label.phone")}
            </label>

            <InputMask
              id="phone"
              name="phone"
              mask="(99) 99999-9999"
              unmask
              value={values.phone}
              placeholder="(00) 00000-0000"
              invalid={erroredData.phone}
              onChange={handleChange}
            />

            {erroredData.phone && <small className="error-text">{t(errors.phone!)}</small>}
          </div>
        </div>

        <div className="cont-input">
          <label htmlFor="email" className={`${erroredData.email && "error-text"}`}>
            {t("form.label.email")}
          </label>

          <InputText
            id="email"
            name="email"
            value={values.email}
            placeholder={t("form.placeholder.email")}
            invalid={erroredData.email}
            onChange={handleChange}
          />

          {erroredData.email && <small className="error-text">{t(errors.email!)}</small>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="cont-input">
            <label htmlFor="password" className={`${erroredData.password && "error-text"}`}>
              {t("form.label.password")}
            </label>

            <IconField iconPosition="right">
              <InputIcon
                className={`pi ${passwordConfig.icon} custom-target-tooltip`}
                data-pr-tooltip={t(passwordConfig.tooltip)}
                onClick={() => handleShowPassword("password")}
              />

              <InputText
                id="password"
                name="password"
                value={values.password}
                placeholder={t("form.placeholder.password")}
                type={passwordConfig.password}
                invalid={erroredData.password}
                onChange={handleChange}
              />
            </IconField>

            {erroredData.password && <small className="error-text">{t(errors.password!)}</small>}
          </div>

          <div className="cont-input">
            <label
              htmlFor="confirmPassword"
              className={`${erroredData.confirmPassword && "error-text"}`}
            >
              {t("form.label.confirmPassword")}
            </label>

            <IconField iconPosition="right">
              <InputIcon
                className={`pi ${passwordConfig.icon} custom-target-tooltip`}
                data-pr-tooltip={t(passwordConfig.tooltip)}
                onClick={() => handleShowPassword("confirmPassword")}
              />

              <InputText
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder={t("form.placeholder.confirmPassword")}
                type={passwordConfig.confirmPassword}
                invalid={erroredData.confirmPassword}
                onChange={handleChange}
              />
            </IconField>

            {erroredData.confirmPassword && (
              <small className="error-text">{t(errors.confirmPassword!)}</small>
            )}
          </div>
        </div>

        <footer className="flex flex-col gap-2 mt-4">
          <Button label={t("buttons.register")} type="submit" />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Divider />
              <small className="shrink-0 text-(--help-text-color)">
                {t("components.login.message.callToLogin")}
              </small>
              <Divider />
            </div>
            <Button
              label={t("buttons.login")}
              outlined
              type="button"
              onClick={() => router.push("/login")}
            />
          </div>
        </footer>
      </form>
    </>
  );
};
