import { SEND_MONEY } from "../types/types";

export const sendMoney1 = (values) => (dispatch) => {
    dispatch({
      type: SEND_MONEY,
      payload: {
        values: values,
      },
    });
  };