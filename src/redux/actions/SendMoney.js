import {
  ADD_RECIPIENT_BANK,
  ADD_RECIPIENT_CONTACT,
  ADD_RECIPIENT_TYPE,
  RECIPIENT_COUNTRY,
  SEND_MONEY_DELIVERY_METHOD,
  SEND_MONEY_PAYMENT_METHOD,
  SET_ACTIVE_STEP,
  SET_RECIPIENT_STEP,
} from "../types/types";

export const setActiveStep = (step) => ({
  type: SET_ACTIVE_STEP,
  payload: step,
});

export const setRecipientStep = (step) => ({
  type: SET_RECIPIENT_STEP,
  payload: step,
});

export const recipientCountry = (values) => ({
  type: RECIPIENT_COUNTRY,
  payload: values,
});

export const addRecipientType = (values) => ({
  type: ADD_RECIPIENT_TYPE,
  payload: values,
});

export const addRecipientBank = (values) => ({
  type: ADD_RECIPIENT_BANK,
  payload: values,
});

export const addRecipientContact = (values) => ({
  type: ADD_RECIPIENT_CONTACT,
  payload: values,
});

export const sendMoneyDeliveryMethod = (values) => ({
  type: SEND_MONEY_DELIVERY_METHOD,
  payload: values,
});

export const sendMoneyPaymentMethod = (values) => ({
  type: SEND_MONEY_PAYMENT_METHOD,
  payload: values,
});
