import { ADD_RECIPIENT_BANK, ADD_RECIPIENT_TYPE, RECIPIENT_COUNTRY } from "../types/types";

const initialState = {
    country: null,
    recipientType: null,
    recipientBank: null,
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
          }
          case ADD_RECIPIENT_BANK:
            return {
              ...state,
              recipientBank: action.payload,
            }
      default:
        return state;
    }
  };
  
  export default sendMoneyReducer;