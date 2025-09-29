import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required("validations.required").min(5, "validations.productName.min"),
  description: yup
    .string()
    .required("validations.required")
    .min(5, "validations.productDescription.min"),
  imageUrl: yup.string().required("validations.required"),
  price: yup.number().required("validations.required"),
});
