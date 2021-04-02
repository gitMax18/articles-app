import {
  MANAGE_LIKE_REQUEST,
  MANAGE_LIKE_SUCCESS,
  MANAGE_LIKE_FAIL,
  RESET_LIKE_STATE,
} from "../types";

import axios from "axios";

const manageLikeRequest = () => {
  return {
    type: MANAGE_LIKE_REQUEST,
  };
};

const manageLikeSuccess = () => {
  return {
    type: MANAGE_LIKE_SUCCESS,
  };
};

const manageLikeFail = (err) => {
  return {
    type: MANAGE_LIKE_FAIL,
    payload: err,
  };
};

export const manageLike = (paperId) => {
  return async (dispatch) => {
    try {
      dispatch(manageLikeRequest());

      await axios.post(`/api/v1/papers/${paperId}/likes`);

      dispatch(manageLikeSuccess());
    } catch (error) {
      if (error.response) {
        dispatch(manageLikeFail(error.response.data.message));
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
