import {
  ADD_EXCHANGE_RATE,
  ADD_PURPOSE_OF_TRANSFER,
  ADD_RECIPIENT_BANK,
  ADD_RECIPIENT_CONTACT,
  ADD_RECIPIENT_TYPE,
  ADD_RECIPIENT_USER,
  ADD_SEND_RECEIVER_MONEY,
  RECIPIENT_COUNTRY,
  RESET_RECIPIENT_STATE,
  SEND_MONEY_ALL_DATA,
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

export const resetRecipientState = (values) => ({
  type: RESET_RECIPIENT_STATE,
  payload: values,
});

export const sendMoneyAllData = (values) => ({
  type: SEND_MONEY_ALL_DATA,
  payload: values,
});

export const recipientUser = (values) => ({
  type: ADD_RECIPIENT_USER,
  payload: values,
});

export const addPurposeOfTransfer = (values) => ({
  type: ADD_PURPOSE_OF_TRANSFER,
  payload: values,
});

export const addExchangeRate = (values) => ({
  type: ADD_EXCHANGE_RATE,
  payload: values,
});

export const addSendReceiveMoney = (values) => ({
  type: ADD_SEND_RECEIVER_MONEY,
  payload: values,
});
