import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required("validations.required").min(5, "validations.productName.min"),
  description: yup
    .string()
    .required("validations.required")
    .min(5, "validations.productDescription.min"),
  image: yup
    .mixed()
    .required("validations.required")
    .test(
      "fileSize",
      "validations.image.maxSize",
      (value) => !value || (value as File).size <= 1000000,
    )
    .test(
      "fileType",
      "validations.image.invalidType",
      (value) => !value || ["image/jpeg", "image/png"].includes((value as File).type),
    ),
  price: yup.number().required("validations.required"),
});
