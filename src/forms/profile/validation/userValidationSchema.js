import * as Yup from "yup";
import {
  alphaNumericRegExp,
  ausMobileNumber,
  emailRegex,
} from "../../../Constants/RegExp";

export const personalDetailsSchema = Yup.object().shape({
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
    // .required("Mobile Number is required")
    .max(10, "Mobile Number must be at most 10 digits"),
});

export const IdDetailsProfileSchema = Yup.object().shape({
  issueAuthorityId: Yup.string().required("Issuing Authority ID is required"),
  documentNumber: Yup.string()
    .matches(alphaNumericRegExp, "ID No. cannot contain special characters")
    .required("ID Number is required"),
  cardNumber: Yup.string().matches(
    alphaNumericRegExp,
    "Card No. cannot contain special characters"
  ),
  dob: Yup.string().required("Date of Birth is required"),
  documentValidity: Yup.string().required("Date of ID Expiry is required"),
  documentTypeId: Yup.string().required("ID Type is required"),
});

export const kycDetailsProfileSchema = Yup.object().shape({
  countryId: Yup.string().required("Country Id not found"),
  stateName: Yup.string().required("State Name is required"),
  nationalityId: Yup.string().required("Nationality ID is required"),
  occupationId: Yup.string().required("Occupation ID is required"),
  streetName: Yup.string().required("Street Name is required"),
  suburb: Yup.string().required("Suburb is required"),
  postalCode: Yup.string().required("Postal Code is required"),
});
export const documentsProfileSchema = Yup.object().shape({});
