import {
  ADD_PURPOSE_OF_TRANSFER,
  ADD_RECIPIENT_BANK,
  ADD_RECIPIENT_CONTACT,
  ADD_RECIPIENT_TYPE,
  ADD_RECIPIENT_USER,
  RECIPIENT_COUNTRY,
  RESET_RECIPIENT_STATE,
  SEND_MONEY_ALL_DATA,
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
  recipientUser: null,
  sendMoneyDeliveryMethod: null,
  sendMoneyPaymentMethod: null,
  addPurposeOfTransfer: null,
  sendMoneyAllData: {},
};

const updateSendMoneyAllData = (state) => ({
  activeStep: state.activeStep,
  recipientStep: state.recipientStep,
  country: state.country,
  recipientType: state.recipientType,
  recipientBank: state.recipientBank,
  recipientContact: state.recipientContact,
  recipientUser: state.recipientUser,
  addPurposeOfTransfer: state.addPurposeOfTransfer,
  sendMoneyDeliveryMethod: state.sendMoneyDeliveryMethod,
  sendMoneyPaymentMethod: state.sendMoneyPaymentMethod,
});

const sendMoneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          activeStep: action.payload,
        },
      };
    case SET_RECIPIENT_STEP:
      return {
        ...state,
        recipientStep: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          recipientStep: action.payload,
        },
      };
    case RECIPIENT_COUNTRY:
      return {
        ...state,
        country: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          country: action.payload,
        },
      };
    case ADD_RECIPIENT_TYPE:
      return {
        ...state,
        recipientType: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          recipientType: action.payload,
        },
      };
    case ADD_RECIPIENT_BANK:
      return {
        ...state,
        recipientBank: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          recipientBank: action.payload,
        },
      };
    case ADD_RECIPIENT_CONTACT:
      return {
        ...state,
        recipientContact: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          recipientContact: action.payload,
        },
      };
      case ADD_RECIPIENT_USER:
        return {
          ...state,
          recipientUser: action.payload,
          sendMoneyAllData: {
            ...state.sendMoneyAllData,
            recipientUser: action.payload,
          },
        };
        case ADD_PURPOSE_OF_TRANSFER:
          return {
            ...state,
            addPurposeOfTransfer: action.payload,
            sendMoneyAllData: {
              ...state.sendMoneyAllData,
              addPurposeOfTransfer: action.payload,
            },
          };
    case SEND_MONEY_DELIVERY_METHOD:
      return {
        ...state,
        sendMoneyDeliveryMethod: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          sendMoneyDeliveryMethod: action.payload,
        },
      };
    case SEND_MONEY_PAYMENT_METHOD:
      return {
        ...state,
        sendMoneyPaymentMethod: action.payload,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          sendMoneyPaymentMethod: action.payload,
        },
      };
      case SEND_MONEY_ALL_DATA:
      return {
        ...state,
        sendMoneyAllData: updateSendMoneyAllData(state),
      };
    case RESET_RECIPIENT_STATE:
      return {
        ...state,
        recipientBank: null,
        recipientContact: null,
        recipientType: null,
        sendMoneyAllData: {
          ...state.sendMoneyAllData,
          recipientBank: null,
          recipientContact: null,
          recipientType: null,
        },
      };
    default:
      return state;
  }
};

export default sendMoneyReducer;
