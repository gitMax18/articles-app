import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  RESET_AUTH_ERROR,
  CHECK_USER_SUCCESS,
  CHECK_USER_NONE,
} from "../types";

const initialUserState = {
  isLoading: false,
  isAuthenticate: false,
  user: null,
  error: null,
  message: "",
};

export const authUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        isLoading: false,
        isAuthenticate: true,
        user: action.payload.user,
        error: null,
        message: action.payload.message,
      };

    case CHECK_USER_SUCCESS:
      return {
        isLoading: false,
        isAuthenticate: true,
        user: action.payload,
        error: null,
      };

    case CHECK_USER_NONE:
      return {
        isLoading: false,
        isAuthenticate: false,
        user: null,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticate: false,
        message: action.payload.message,
        user: null,
        error: null,
      };

    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        isLoading: false,
        isAuthenticate: false,
        user: null,
        error: action.payload,
        message: action.payload.message,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case RESET_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
