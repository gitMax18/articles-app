import {
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  REMOVE_LIKE_FAIL,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  RESET_LIKE_STATE,
} from "../types";

import axios from "axios";

const addLikeRequest = () => {
  return {
    type: ADD_LIKE_REQUEST,
  };
};

const addLikeSuccess = (data) => {
  return {
    type: ADD_LIKE_SUCCESS,
    payload: data,
  };
};

const addLikeFail = (err) => {
  return {
    type: ADD_LIKE_FAIL,
    payload: err,
  };
};

export const addLike = (paperId) => {
  return async (dispatch) => {
    try {
      dispatch(addLikeRequest());

      const { data } = await axios.get(`/api/v1/papers/${paperId}/likes`);
      dispatch(addLikeSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(addLikeFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

const removeLikeRequest = () => {
  return {
    type: REMOVE_LIKE_REQUEST,
  };
};

const removeLikeSuccess = (data) => {
  return {
    type: REMOVE_LIKE_SUCCESS,
    payload: data,
  };
};

const removeLikeFail = (err) => {
  return {
    type: REMOVE_LIKE_FAIL,
    payload: err,
  };
};

export const removeLike = (paperId) => {
  return async (dispatch) => {
    try {
      dispatch(removeLikeRequest());

      const { data } = await axios.delete(`/api/v1/papers/${paperId}/likes`);

      dispatch(removeLikeSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(removeLikeFail(error.response.message));
      } else {
        console.log(error);
      }
    }
  };
};

export const resetLikeState = () => {
  return {
    type: RESET_LIKE_STATE,
  };
};
