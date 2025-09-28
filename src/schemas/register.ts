import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup.string().required("validations.required").min(5, "validations.fullName.min"),
  cpf: yup.string().required("validations.required").length(11, "validations.cpf.invalid"),
  phone: yup.string().required("validations.required").length(11, "validations.phone.invalid"),
  email: yup.string().email("validations.email.invalid").required("validations.required"),
  password: yup
    .string()
    .required("validations.required")
    .min(8, "validations.password.min")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=[\]\\{}|;:'",./<>?])[A-Za-z*\d~!@#$%^&*()_+\-=[\]\\{}|;:'",./<>?]{8,}$/,
      "validations.password.invalid",
    ),
  confirmPassword: yup
    .string()
    .required("validations.required")
    .oneOf([yup.ref("password")], "validations.password.match"),
});
