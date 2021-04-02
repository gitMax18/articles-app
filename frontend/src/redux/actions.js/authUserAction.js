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
        withCredentials: true,
        credentials: "includes",
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

export const checkUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

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
