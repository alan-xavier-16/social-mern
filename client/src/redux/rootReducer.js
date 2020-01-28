import { combineReducers } from "redux";
import alertReducer from "../redux/alerts/alert.reducer";

const rootReducer = combineReducers({
  alert: alertReducer
});

export default rootReducer;
