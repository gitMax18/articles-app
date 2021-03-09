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
import axios from "axios";

const getProfilUserRequest = () => {
  return {
    type: PROFIL_USER_REQUEST,
  };
};

const getProfilUserSuccess = (user) => {
  return {
    type: PROFIL_USER_SUCCESS,
    payload: user,
  };
};

const getProfilUserFail = (error) => {
  return {
    type: PROFIL_USER_FAIL,
    payload: error,
  };
};

export const getUserProfil = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getProfilUserRequest());

      const { data } = await axios.get(`/user/${id}`);

      dispatch(getProfilUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getProfilUserFail(error.response.data.message));
    }
  };
};

const updateProfilUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

const updateProfilUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

const updateProfilUserFail = (error) => {
  return {
    type: UPDATE_USER_FAIL,
    payload: error,
  };
};

export const updateUserProfil = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(updateProfilUserRequest());

      const { data } = await axios.put(`/user/update`, dataUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(updateProfilUserSuccess(data.user));
    } catch (error) {
      console.log(error);
      dispatch(updateProfilUserFail(error.response.data.message));
    }
  };
};

// update user Password

const updatePasswordUserRequest = () => {
  return {
    type: UPDATE_PASSWORD_REQUEST,
  };
};

const updatePasswordUserSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
};

const updatePasswordUserFail = (error) => {
  return {
    type: UPDATE_PASSWORD_FAIL,
    payload: error,
  };
};

export const updateUserPassword = (passwords) => {
  return async (dispatch) => {
    try {
      dispatch(updatePasswordUserRequest());

      await axios.put(`/user/update/password`, passwords, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(updatePasswordUserSuccess());
    } catch (error) {
      console.log(error);
      dispatch(updatePasswordUserFail(error.response.data.message));
    }
  };
};
