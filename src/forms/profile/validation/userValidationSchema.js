import * as Yup from "yup";

export const personalDetailsSchema = Yup.object().shape({
  //   email: Yup.string().required("Email is required"),
});

export const IdDetailsProfileSchema = Yup.object().shape({
  issueAuthorityId: Yup.string().required("Issuing Authority ID is required"),
  documentNumber: Yup.string().required("ID Number is required"),
  cardNumber: Yup.string().required("Card Number is required"),
  dob: Yup.string().required("Date of Birth is required"),
  documentValidity: Yup.string().required("Date of ID Expiry is required"),
  documentTypeId: Yup.string().required("ID Type is required"),
});

export const kycDetailsProfileSchema = Yup.object().shape({
  countryId: Yup.string().required("Country Id not found"),
  stateId: Yup.string().required("Sate ID is required"),
  nationalityId: Yup.string().required("Nationality ID is required"),
  occupationId: Yup.string().required("Occupation ID is required"),
  streetName: Yup.string().required("Street Name is required"),
  suburb: Yup.string().required("Suburb is required"),
  postalCode: Yup.string().required("Postal Code is required"),
});
export const documentsProfileSchema = Yup.object().shape({

});
