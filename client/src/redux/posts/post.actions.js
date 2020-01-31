import PostActionTypes from "./post.types";
import axios from "axios";

import { setAlert } from "../alerts/alert.actions";

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: PostActionTypes.GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
