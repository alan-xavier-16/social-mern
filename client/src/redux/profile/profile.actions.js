import axios from "axios";
import ProfileActionTypes from "./profile.types";

import { setAlert } from "../alerts/alert.actions";

// Get User's Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Clear Profile on Logout
export const clearProfile = () => dispatch => {
  dispatch({ type: ProfileActionTypes.CLEAR_PROFILE });
};

// Create or Update Profile... history from React Router
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("api/profile/experience", formData, config);

    dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("api/profile/education", formData, config);

    dispatch({
      type: ProfileActionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
