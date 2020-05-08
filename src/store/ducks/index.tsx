import { combineReducers } from "redux";

import AlertReducer from "./alertReducer";
import user from "./user";

export default combineReducers({
  user,
  AlertReducer
});