import * as Yup from "yup";
import { phoneRegExp } from "../../../Constants/RegExp";

export const sendMoneyCalculateSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  resMoney: Yup.string().required("Receiving Money is required"),
  deliveryMethod: Yup.string().required("Delivery Method is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
});

export const sendMoneyRecipientBankSchema = Yup.object().shape({
  method: Yup.string().required("Payment Method is required"),
  firstName: Yup.string().when("method", {
    is: (val) => val === "Bank Deposit",
    then: Yup.string().required("First Name is required"),
    otherwise: Yup.string().when("method", {
      is: (val) => val === "Wallet Deposit",
      then: Yup.string().required("First Name is required"),
      otherwise: Yup.string().when("method", {
        is: (val) => val === "Cash Pickup",
        then: Yup.string().required("First Name is required"),
        otherwise: Yup.string(),
      }),
    }),
  }),
  middleName: Yup.string(),
  lastName: Yup.string().when("method", {
    is: (val) => val === "Bank Deposit",
    then: Yup.string().required("Last Name is required"),
    otherwise: Yup.string().when("method", {
      is: (val) => val === "Wallet Deposit",
      then: Yup.string().required("Last Name is required"),
      otherwise: Yup.string().when("method", {
        is: (val) => val === "Cash Pickup",
        then: Yup.string().required("Last Name is required"),
        otherwise: Yup.string(),
      }),
    }),
  }),
  bankId: Yup.string().when("method", {
    is: (val) => val === "Bank Deposit",
    then: Yup.string().required("Bank Name is required"),
    otherwise: Yup.string(),
  }),
  bankAccNo: Yup.string().when("method", {
    is: (val) => val === "Bank Deposit",
    then: Yup.string().required("Bank Account Number is required"),
    otherwise: Yup.string(),
  }),
  walletName: Yup.string().when("method", {
    is: (val) => val === "Wallet Deposit",
    then: Yup.string().required("Wallet Name is required"),
    otherwise: Yup.string(),
  }),
  walletNo: Yup.string().when("method", {
    is: (val) => val === "Wallet Deposit",
    then: Yup.string().required("Wallet Account Number is required"),
    otherwise: Yup.string(),
  }),
  // lastName: Yup.string().required("Last Name is required"),
  // bankName: Yup.string().required("Bank Name is required"),
  // bankAccNo: Yup.string().required("Bank Account Number is required"),
});

export const sendMoneyRecipientContactSchema = Yup.object().shape({
  // address: Yup.string().required("Address is required"),
  city: Yup.string().required("House No./Street Name is required"),
  district: Yup.string().required("District Name is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  stateName: Yup.string().required("State/Province Name is required"),
  phone: Yup.string().required("Mobile Number is required").matches(phoneRegExp, "Invalid mobile number"),
  relationId: Yup.string().required("Relation is required"),
});