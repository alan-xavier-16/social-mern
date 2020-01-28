import { combineReducers } from "redux";
import alertReducer from "./alerts/alert.reducer";
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer
});

export default rootReducer;
