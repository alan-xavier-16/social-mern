import PostActionTypes from "./post.types";

const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PostActionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case PostActionTypes.POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case PostActionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, like: payload.likes } : post
        ),
        loading: false
      };
    default:
      return state;
  }
};

export default postReducer;
