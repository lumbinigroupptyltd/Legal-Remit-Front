// import * as Yup from "yup";
// import { ausMobileNumber, emailRegex, passwordRegExp } from "../../../../Constants/RegExp";

// const signupSchema = Yup.object().shape({
//   countryId: Yup.string().required("Country ID is required"),
//   countryName: Yup.string().required("Country Name is required"),
//   roleId: Yup.string().required("User Type is required"),
//   firstName: Yup.string().when("roleId", {
//     is: (val) => val === 2, // Ensure the comparison value matches the expected type (string in this case)
//     then: Yup.string().required("First Name is required"),
//     otherwise: Yup.string(),
//   }),
//   middleName: Yup.string(),
//   // phone: Yup.string().when("countryName", {
//   //   is: "Australia",
//   //   then: Yup.string()
//   //     .required("Mobile Number is required")
//   //     .matches(ausMobileNumber, "Mobile Number must start with 04 or 4 and have 9 digits"),
//   //   otherwise: Yup.string()
//   //     .required("Mobile Number is required")
//   //     .max(10, "Mobile Number can be at most 10 digits")
//   // }),
//   email: Yup.string()
//     .required("Email is required")
//     .matches(emailRegex, "Invalid email"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(
//       passwordRegExp,
//       "Password must contain one special character, uppercase and number"
//     )
//     .min(8, "Password must be 8 characters long"),
//   confirmPassword: Yup.string()
//     .required("Confirm Password is required")
//     .oneOf([Yup.ref("password"), null], "Passwords must match"),
//   // fullName: Yup.string().when("roleId", {
//   //   is: "1",
//   //   then: Yup.string().required("Full Name is required"),
//   //   otherwise: Yup.string(),
//   // }),
//   // businessName: Yup.string().when("roleId", {
//   //   is: "1",
//   //   then: Yup.string().required("Business Name is required"),
//   //   otherwise: Yup.string(),
//   // }),
//   // registrationNumber: Yup.string().when("roleId", {
//   //   is: "1",
//   //   then: Yup.string().required("Registration Name is required"),
//   //   otherwise: Yup.string(),
//   // }),
//   // address: Yup.string().when("roleId", {
//   //   is: "1",
//   //   then: Yup.string().required("Address is required"),
//   //   otherwise: Yup.string(),
//   // }),
// });

// export { signupSchema };

import * as Yup from "yup";
import {
  ausMobileNumber,
  emailRegex,
  passwordRegExp,
} from "../../../../Constants/RegExp";

const signupSchema = Yup.object().shape({
  countryId: Yup.string().required("Country ID is required"),
  countryName: Yup.string().required("Country Name is required"),
  roleId: Yup.string().required("User Type is required"),
  firstName: Yup.string().when("roleId", {
    is: (val) => val === "4b0fa25e-6dd9-480f-bdd7-59247705c132",
    then: Yup.string().required("First Name is required"),
    otherwise: Yup.string(),
  }),
  middleName: Yup.string(),
  lastName: Yup.string().when("roleId", {
    is: (val) => val === "4b0fa25e-6dd9-480f-bdd7-59247705c132",
    then: Yup.string().required("Last Name is required"),
    otherwise: Yup.string(),
  }),
  firstName: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("Full Name is required"),
    otherwise: Yup.string(),
  }),
  businessName: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("Business Name is required"),
    otherwise: Yup.string(),
  }),
  regNo: Yup.string().when("roleId", {
    is: (val) => val === "3221eca8-3f8e-40ab-b046-3fb56af938fd",
    then: Yup.string().required("Registration Number is required"),
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
