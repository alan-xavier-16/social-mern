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

// Add post
export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/posts`, formData, config);

    dispatch({
      type: PostActionTypes.ADD_POST,
      payload: res.data
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get a post
export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: PostActionTypes.GET_POST,
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

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: PostActionTypes.ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: PostActionTypes.REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    console.log(error.response);

    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PostActionTypes.POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
