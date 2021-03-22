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
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_USER_ERROR,
} from "../types";

const initialUserState = {
  isLoading: false,
  user: {},
  error: null,
  papers: [],
  isUpdated: false,
  message: "",
};

export const getUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case PROFIL_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
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
        message: action.payload.message,
        error: null,
        isUpdated: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        message: action.payload.message,
        error: null,
        isUpdated: true,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: action.payload.message,
        isUpdated: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: {},
        message: action.payload.message,
        paper: [],
        isUpdated: false,
      };

    case PROFIL_USER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case RESET_USER_ERROR:
      return {
        ...state,
        error: null,
        isUpdated: false,
      };
    default:
      return state;
  }
};
