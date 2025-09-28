"use client";

import { useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib";
import { login } from "@/lib/auth";
import { loginSchema } from "@/schemas";
import { useAuthStore } from "@/stores";
import { mapErrorMessage } from "@/utils/mapErrorMessages";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const toastRef = useRef<ToastHandle>(null);

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setRoleFromCookie = useAuthStore((state) => state.setRoleFromCookie);

  const [icon, setIcon] = useState("pi-eye");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [viewPasswordTooltip, setViewPasswordTooltip] = useState(
    "components.login.tooltip.showPassword",
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);

        setAuthenticated(true);
        setRoleFromCookie();

        router.push("/");
      } catch (error) {
        const message = mapErrorMessage((error as ApiError).message);

        toastRef.current?.show({ detail: t(message) });
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const isEmailErrored = !!(touched.email && errors.email);
  const isPasswordErrored = !!(touched.password && errors.password);

  const handleShowPassword = () => {
    setIcon(icon === "pi-eye" ? "pi-eye-slash" : "pi-eye");
    setPasswordFieldType(passwordFieldType === "password" ? "text" : "password");
    setViewPasswordTooltip(
      viewPasswordTooltip === "components.login.tooltip.showPassword"
        ? "components.login.tooltip.hidePassword"
        : "components.login.tooltip.showPassword",
    );
  };

  return (
    <>
      <Toast ref={toastRef} severity="error" summary={t("toast.summary.error")} />

      <Tooltip target=".custom-target-tooltip" />

      <form className="cont-form" onSubmit={handleSubmit}>
        <div className="cont-input">
          <label htmlFor="email" className={`${isEmailErrored && "error-text"}`}>
            {t("form.label.email")}
          </label>

          <InputText
            id="email"
            name="email"
            value={values.email}
            placeholder={t("form.placeholder.email")}
            invalid={isEmailErrored}
            onChange={handleChange}
          />

          {isEmailErrored && <small className="error-text">{t(errors.email!)}</small>}
        </div>

        <div className="cont-input">
          <label htmlFor="password" className={`${isPasswordErrored && "error-text"}`}>
            {t("form.label.password")}
          </label>

          <IconField iconPosition="right">
            <InputIcon
              className={`pi ${icon} custom-target-tooltip`}
              data-pr-tooltip={t(viewPasswordTooltip)}
              onClick={handleShowPassword}
            />

            <InputText
              id="password"
              name="password"
              value={values.password}
              placeholder={t("form.placeholder.password")}
              type={passwordFieldType}
              invalid={isPasswordErrored}
              onChange={handleChange}
            />
          </IconField>

          {isPasswordErrored && <small className="error-text">{t(errors.password!)}</small>}
        </div>

        <footer className="flex flex-col gap-2 mt-2">
          <Button label={t("buttons.login")} type="submit" />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Divider />
              <small className="shrink-0 text-(--help-text-color)">
                {t("components.login.message.callToRegister")}
              </small>
              <Divider />
            </div>
            <Button
              label={t("buttons.register")}
              outlined
              type="button"
              onClick={() => router.push("/register")}
            />
          </div>
        </footer>
      </form>
    </>
  );
};
