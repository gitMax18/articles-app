import {
  PROFIL_USER_REQUEST,
  PROFIL_USER_SUCCESS,
  PROFIL_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../types";

const initialUserState = {
  isLoading: true,
  user: {},
  error: null,
  papers: [],
  isUpdated: false,
};

export const getUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case PROFIL_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PROFIL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        papers: action.payload.papers,
        isUpdated: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
        isUpdated: true,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: state.user,
        isUpdated: true,
      };

    case PROFIL_USER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
