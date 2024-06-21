import * as Yup from "yup";

export const sendMoneyCalculateSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required"),
  resMoney: Yup.string().required("Receiving Money is required"),
  deliveryMethod: Yup.string().required("Delivery Method is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
});
