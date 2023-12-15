import * as yup from "yup";

export const baseUrl = `http://localhost:8080/api/v1/`;

const getCharacterValidationError = (str) => {
  return `It must contain at least 1 ${str} character`;
};

export const registerValidationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/, "Invalid User Name")
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(
      /[!@#$%^&*()\-_=+{};:,<.>]/,
      getCharacterValidationError("special characters")
    )
    .required(),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "password and re password not matched")
    .required(),
});
export const signInValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const createTaskValidation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});
