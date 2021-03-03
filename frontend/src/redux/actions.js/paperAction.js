import {
  GET_ALL_PAPERS_REQUEST,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_PAPERS_FAIL,
} from "../types";

import axios from "axios";

const getAllPapersRequest = () => {
  return {
    type: GET_ALL_PAPERS_REQUEST,
  };
};

const getAllPaperSuccess = (paper) => {
  return {
    type: GET_ALL_PAPERS_SUCCESS,
    payload: paper,
  };
};

const getAllPapersFail = (error) => {
  return {
    type: GET_ALL_PAPERS_FAIL,
    payload: error,
  };
};

export const getAllPapers = (querySearch) => {
  console.log(querySearch);
  return async (dispatch) => {
    try {
      dispatch(getAllPapersRequest());

      const { data } = await axios.get(
        `/papers?title=${querySearch.title}&category=${querySearch.category}`
      );

      dispatch(getAllPaperSuccess(data));
    } catch (error) {
      dispatch(getAllPapersFail(error.response.data.message));
    }
  };
};
