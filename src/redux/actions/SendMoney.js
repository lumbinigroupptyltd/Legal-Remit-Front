import { ADD_RECIPIENT_BANK, ADD_RECIPIENT_TYPE, RECIPIENT_COUNTRY } from "../types/types";

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
