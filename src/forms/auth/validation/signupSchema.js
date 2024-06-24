import * as Yup from "yup";
import {
  alphaNumericRegExp,
  ausMobileNumber,
  emailRegex,
  passwordRegExp,
} from "../../../Constants/RegExp";

const signupSchema = Yup.object().shape({
  countryId: Yup.string().required("Country ID is required"),
  countryName: Yup.string().required("Country Name is required"),
  roleId: Yup.string().required("User Type is required"),
  firstName: Yup.string().when("roleId", {
    is: (val) => val === "4b0fa25e-6dd9-480f-bdd7-59247705c132",
    then: Yup.string().required("First Name is required"),
    otherwise: Yup.string().when("roleId", {
      is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
      then: Yup.string().required("Full Name is required"),
      otherwise: Yup.string(),
    }),
  }),
  middleName: Yup.string(),
  lastName: Yup.string().when("roleId", {
    is: (val) => val === "4b0fa25e-6dd9-480f-bdd7-59247705c132",
    then: Yup.string().required("Last Name is required"),
    otherwise: Yup.string(),
  }),
  // firstName: Yup.string().when("roleId", {
  //   is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
  //   then: Yup.string().required("Full Name is required"),
  //   otherwise: Yup.string(),
  // }),
  businessName: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("Business Name is required"),
    otherwise: Yup.string(),
  }),
  abn: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("ABN Number is required")
    .matches(alphaNumericRegExp, "ABN Number cannot contain special characters"),
    otherwise: Yup.string(),
  }),
  businessAddress: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("Address is required"),
    otherwise: Yup.string(),
  }),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email"),
    phoneNumber: Yup.string().when("countryName", {
    is: (val) => val === "Australia",
    then: Yup.string()
      .required("Mobile Number is required")
      .matches(
        ausMobileNumber,
        "Mobile Number must start with 0 or 4 & must have 10 or 9 digits respectively"
      )
      .max(10, "Mobile Number must be at most 10 digits"),
    otherwise: Yup.string()
      .required("Mobile Number is required")
      .max(10, "Mobile Number must be at most 10 digits"),
  }),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegExp,
      "Password must contain one special character, uppercase and number"
    )
    .min(8, "Password must be 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export { signupSchema };
