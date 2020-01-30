import axios from "axios";
import { setAlert } from "../alerts/alert.actions";
import AuthActionTypes from "./auth.types";
import ProfileActionTypes from "../profile/profile.types";
import setAuthToken from "../../utils/auth.utils";

// Load User for Auth Routes
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
    dispatch({ type: AuthActionTypes.AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: AuthActionTypes.REGISTER_FAIL });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: AuthActionTypes.LOGIN_FAIL });
  }
};

// Logout User and clear Profile
export const logout = () => dispatch => {
  dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
  dispatch({ type: AuthActionTypes.LOGOUT });
};

// Delete Account and Profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This is permanent.")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
      dispatch({ type: AuthActionTypes.ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ProfileActionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};
