import ProfileActionTypes from "./profile.types";

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileActionTypes.GET_PROFILE:
    case ProfileActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ProfileActionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case ProfileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ProfileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case ProfileActionTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
