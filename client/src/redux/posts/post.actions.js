import PostActionTypes from "./post.types";
import axios from "axios";

import { setAlert } from "../alerts/alert.actions";

// Get all posts
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

// Add like to post
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: PostActionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Remove like from post
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: PostActionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: PostActionTypes.DELETE_POST,
      payload: postId
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
