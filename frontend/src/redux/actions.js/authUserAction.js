import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_AUTH_ERROR,
  CHECK_USER_SUCCESS,
  CHECK_USER_NONE,
} from "../types";
import axios from "axios";

const setLocalStorageUser = (dataUser) => {
  const expireTime = Date.now() + 3 * 24 * 60 * 60 * 1000;

  localStorage.setItem("user", JSON.stringify({ ...dataUser, expireTime }));
};

// Register User
const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
};

const registerUserFail = (error) => {
  return {
    type: REGISTER_USER_FAIL,
    payload: error,
  };
};

export const registerUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(registerUserRequest());

      const { data } = await axios.post("/api/v1/user/register", dataUser, {
        withCredentials: true,
        credentials: "includes",
        headers: {
          "Content-type": "application/json",
        },
      });

      dispatch(registerUserSuccess(data));
      setLocalStorageUser(data.user);
    } catch (error) {
      dispatch(registerUserFail(error.response.data.message));
    }
  };
};

// LOGIN User
const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

const loginUserFail = (error) => {
  return {
    type: LOGIN_USER_FAIL,
    payload: error,
  };
};

export const loginUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(loginUserRequest());

      const { data } = await axios.post("/api/v1/user/login", dataUser, {
        headers: {
          "Content-type": "application/json",
        },
      });

      dispatch(loginUserSuccess(data));
      setLocalStorageUser(data.user);
    } catch (error) {
      console.log(error);
      dispatch(loginUserFail(error.response.data.message));
    }
  };
};

//logout user
const logoutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

const logoutUserSuccess = (data) => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: data,
  };
};

const logoutUserFail = (error) => {
  return {
    type: LOGOUT_USER_FAIL,
    payload: error,
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutUserRequest());

      const { data } = await axios.get("/api/v1/user/logout");
      localStorage.removeItem("user");

      dispatch(logoutUserSuccess(data));
    } catch (error) {
      dispatch(logoutUserFail(error.response.data.message));
    }
  };
};

//forgotPassword
const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
  };
};

const forgotPasswordSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

const forgotPasswordFail = (error) => {
  return {
    type: FORGOT_PASSWORD_FAIL,
    payload: error,
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPasswordRequest());

      const { data } = await axios.post(
        "/api/v1/user/forgotPassword",
        { email },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      dispatch(forgotPasswordSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(forgotPasswordFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

//resetPassword
const resetPasswordRequest = () => {
  return {
    type: RESET_PASSWORD_REQUEST,
  };
};

const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};

const resetPasswordFail = (error) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: error,
  };
};

export const resetPassword = (token, password) => {
  return async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());

      const { data } = await axios.post(
        `/api/v1/user/resetPassword/${token}`,
        { password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      dispatch(resetPasswordSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(resetPasswordFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

export const checkUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.expireTime > Date.now()) {
    return {
      type: CHECK_USER_SUCCESS,
      payload: user,
    };
  } else {
    return {
      type: CHECK_USER_NONE,
    };
  }
};

export const resetAuthError = () => {
  return {
    type: RESET_AUTH_ERROR,
  };
};
