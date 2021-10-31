import axios from "axios";
import {
  ADD_COMMENTARY_REQUEST,
  ADD_COMMENTARY_SUCCESS,
  ADD_COMMENTARY_FAIL,
  UPDATE_COMMENTARY_SUCCESS,
  UPDATE_COMMENTARY_REQUEST,
  UPDATE_COMMENTARY_FAIL,
  DELETE_COMMENTARY_REQUEST,
  DELETE_COMMENTARY_SUCCESS,
  DELETE_COMMENTARY_FAIL,
} from "../types";

const addCommentaryRequest = () => {
  return {
    type: ADD_COMMENTARY_REQUEST,
  };
};

const addCommentarySuccess = (data) => {
  return {
    type: ADD_COMMENTARY_SUCCESS,
    payload: data,
  };
};

const addCommentaryFail = (data) => {
  return {
    type: ADD_COMMENTARY_FAIL,
    payload: data,
  };
};

export const addCommentary = (paperId, commentary, user) => {
  return async (dispatch) => {
    try {
      dispatch(addCommentaryRequest());

      const { data } = await axios.post(`/api/v1/papers/${paperId}/reviews`, commentary, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(addCommentarySuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(addCommentaryFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

const updateCommentaryRequest = () => {
  return {
    type: UPDATE_COMMENTARY_REQUEST,
  };
};

const updateCommentarySuccess = (data) => {
  return {
    type: UPDATE_COMMENTARY_SUCCESS,
    payload: data,
  };
};

const updateCommentaryFail = (data) => {
  return {
    type: UPDATE_COMMENTARY_FAIL,
    payload: data,
  };
};

export const updateCommentary = (paperId, review) => {
  return async (dispatch) => {
    console.log(paperId);
    try {
      dispatch(updateCommentaryRequest());

      const { data } = await axios.put(`/api/v1/papers/${paperId}/reviews`, review, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch(updateCommentarySuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(updateCommentaryFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

const deleteCommentaryRequest = () => {
  return {
    type: DELETE_COMMENTARY_REQUEST,
  };
};

const deleteCommentarySuccess = (data) => {
  return {
    type: DELETE_COMMENTARY_SUCCESS,
    payload: data,
  };
};

const deleteCommentaryFail = (data) => {
  return {
    type: DELETE_COMMENTARY_FAIL,
    payload: data,
  };
};

export const deleteCommentary = (paperId, reviewId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCommentaryRequest());

      const { data } = await axios.delete(`/api/v1/reviews/${reviewId}`);

      dispatch(deleteCommentarySuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(deleteCommentaryFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};
