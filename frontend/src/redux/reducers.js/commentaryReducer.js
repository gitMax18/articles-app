import {
  ADD_COMMENTARY_FAIL,
  ADD_COMMENTARY_REQUEST,
  ADD_COMMENTARY_SUCCESS,
} from "../types";

const initialCommentaryState = {
  isLoading: false,
  isUpdated: false,
  error: null,
  isDeleted: false,
};

const CommentaryReducer = (state = initialCommentaryState, action) => {
  switch (action.type) {
    case ADD_COMMENTARY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_COMMENTARY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_COMMENTARY_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
