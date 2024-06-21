import {
  ADD_RECIPIENT_BANK,
  ADD_RECIPIENT_CONTACT,
  ADD_RECIPIENT_TYPE,
  RECIPIENT_COUNTRY,
  RESET_RECIPIENT_STATE,
  SEND_MONEY_DELIVERY_METHOD,
  SEND_MONEY_PAYMENT_METHOD,
  SET_ACTIVE_STEP,
  SET_RECIPIENT_STEP,
} from "../types/types";

const initialState = {
  activeStep: 0,
  recipientStep: 0,
  country: null,
  recipientType: null,
  recipientBank: null,
  recipientContact: null,
  sendMoneyDeliveryMethod: null,
  sendMoneyPaymentMethod: null,
};

const sendMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };
    case SET_RECIPIENT_STEP:
      return {
        ...state,
        recipientStep: action.payload,
      };
    case RECIPIENT_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case ADD_RECIPIENT_TYPE:
      return {
        ...state,
        recipientType: action.payload,
      };
    case ADD_RECIPIENT_BANK:
      return {
        ...state,
        recipientBank: action.payload,
      };
    case ADD_RECIPIENT_CONTACT:
      return {
        ...state,
        recipientContact: action.payload,
      };
    case SEND_MONEY_DELIVERY_METHOD:
      return {
        ...state,
        sendMoneyDeliveryMethod: action.payload,
      };
    case SEND_MONEY_PAYMENT_METHOD:
      return {
        ...state,
        sendMoneyPaymentMethod: action.payload,
      };
    case RESET_RECIPIENT_STATE:
      return {
        ...state,
        recipientBank: null,
        recipientContact: null,
        recipientType: null,
      };
    default:
      return state;
  }
};

export default sendMoneyReducer;
