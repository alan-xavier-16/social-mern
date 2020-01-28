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
