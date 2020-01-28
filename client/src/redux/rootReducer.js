import { combineReducers } from "redux";
import alertReducer from "./alerts/alert.reducer";
import authReducer from "./auth/auth.reducer";
import profileReducer from "./profile/profile.reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
