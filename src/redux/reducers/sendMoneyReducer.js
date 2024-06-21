import {
  ADD_RECIPIENT_BANK,
  ADD_RECIPIENT_CONTACT,
  ADD_RECIPIENT_TYPE,
  RECIPIENT_COUNTRY,
  SEND_MONEY_DELIVERY_METHOD,
  SEND_MONEY_PAYMENT_METHOD,
} from "../types/types";

const initialState = {
  country: null,
  recipientType: null,
  recipientBank: null,
  recipientContact: null,
  sendMoneyDeliveryMethod: null,
  sendMoneyPaymentMethod: null,
};

const sendMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default sendMoneyReducer;
