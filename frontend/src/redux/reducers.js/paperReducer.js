import {
  GET_ALL_PAPERS_REQUEST,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_PAPERS_FAIL,
} from "../types";

const initialPaperState = {
  isLoading: true,
  papersData: null,
  error: null,
};

export const paperReducer = (state = initialPaperState, action) => {
  switch (action.type) {
    case GET_ALL_PAPERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_PAPERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        papersData: action.payload,
        error: null,
      };
    case GET_ALL_PAPERS_FAIL:
      return {
        ...state,
        isLoading: false,
        papersData: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
