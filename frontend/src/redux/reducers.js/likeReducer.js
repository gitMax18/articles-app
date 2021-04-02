import {
  MANAGE_LIKE_REQUEST,
  MANAGE_LIKE_SUCCESS,
  MANAGE_LIKE_FAIL,
  RESET_LIKE_STATE,
} from "../types";

const initialLikeState = {
  isLoading: false,
  isUpdated: false,
  error: null,
};

const likeReducer = (state = initialLikeState, action) => {
  switch (action.type) {
    case MANAGE_LIKE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MANAGE_LIKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: true,
      };
    case MANAGE_LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
        error: action.payload,
      };
    case RESET_LIKE_STATE:
      return {
        ...initialLikeState,
      };
    default:
      return state;
  }
};

export default likeReducer;
