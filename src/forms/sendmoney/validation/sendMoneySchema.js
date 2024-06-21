import * as Yup from "yup";

export const sendMoneyCalculateSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  resMoney: Yup.string().required("Receiving Money is required"),
  deliveryMethod: Yup.string().required("Delivery Method is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
});

export const sendMoneyRecipientBankSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last Name is required"),
  bankName: Yup.string().required("Bank Name is required"),
  bankAccNo: Yup.string().required("Bank Account Number is required"),
});

export const sendMoneyRecipientContactSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City/District is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  stateId: Yup.string().required("State/Province Name is required"),
  phone: Yup.string().required("Mobile Number is required"),
  relationId: Yup.string().required("Relation is required"),
});