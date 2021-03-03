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

const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
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

      const { data } = await axios.post("http://localhost:5000/register", dataUser, {
        headers: {
          "Content-type": "application/json",
        },
      });

      dispatch(registerUserSuccess(data.user));
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

const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
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

      const { data } = await axios.post("http://localhost:5000/login", dataUser, {
        headers: {
          "Content-type": "application/json",
        },
      });

      dispatch(loginUserSuccess(data.user));
      setLocalStorageUser(data.user);
    } catch (error) {
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

const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
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

      await axios.get("/logout");
      localStorage.removeItem("user");

      dispatch(logoutUserSuccess());
    } catch (error) {
      dispatch(logoutUserFail(error.response.data.message));
    }
  };
};
