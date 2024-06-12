import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import navigationReducer from "./navigationReducer";
import analyticalReducer from "./analyticalReducer";
import demographicReducer from "./demographicReducer";
import ioTReducer from "./ioTReducer";
import mailInboxReducer from "./mailInboxReducer";
import UIElementsReducer from "./UIElementsReducer";
import authReducer from "./authReducer";
import sendMoneyReducer from "./sendMoneyReducer";

export default combineReducers({
  auth: authReducer,
  sendMoney: sendMoneyReducer,
  loginReducer,
  navigationReducer: navigationReducer,
  analyticalReducer: analyticalReducer,
  demographicReducer: demographicReducer,
  ioTReducer: ioTReducer,
  mailInboxReducer: mailInboxReducer,
  UIElementsReducer: UIElementsReducer,
});
