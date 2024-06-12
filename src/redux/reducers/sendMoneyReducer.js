import { SEND_MONEY } from "../types/types";

const initialState = {
    values: null,
  };

  if (initialState.values) {
    initialState.values = values;
  };

  const sendMoneyReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_MONEY:
        return {
          ...state,
          values: action.payload.values,
        };
      default:
        return state;
    }
  };
  
  export default sendMoneyReducer;