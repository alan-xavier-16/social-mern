import axios from "axios";
import { setAlert } from "../alerts/alert.actions";
import AuthActionTypes from "./auth.types";
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
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({ type: AuthActionTypes.REGISTER_FAIL });
  }
};
