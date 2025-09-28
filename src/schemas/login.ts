import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("validations.email.invalid").required("validations.required"),
  password: yup.string().required("validations.required"),
});
