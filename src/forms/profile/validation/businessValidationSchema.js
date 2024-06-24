import * as Yup from "yup";
import { ausMobileNumber, emailRegex } from "../../../Constants/RegExp";

export const personalBusinessSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email"),
  phoneNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(
      ausMobileNumber,
      "Mobile Number must start with 0 or 4 & must have 10 or 9 digits respectively"
    )
    .max(10, "Mobile Number must be at most 10 digits"),
  otherwise: Yup.string()
    .required("Mobile Number is required")
    .max(10, "Mobile Number must be at most 10 digits"),
});

export const personalBusinessExtraSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});

export const IdBusinessSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});

export const kycBusinessSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});
export const documentsBusinessSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});
export const directorBusinessSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});
export const shareholderBusinessSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});
