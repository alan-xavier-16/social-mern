import { combineReducers } from "redux";
import alertReducer from "./alerts/alert.reducer";
import authReducer from "./auth/auth.reducer";
import profileReducer from "./profile/profile.reducer";
import postReducer from "./posts/post.reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
});

export default rootReducer;
