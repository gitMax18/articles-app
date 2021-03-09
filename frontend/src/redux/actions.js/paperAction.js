import {
  GET_ALL_PAPERS_REQUEST,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_PAPERS_FAIL,
  GET_ONE_PAPERS_REQUEST,
  GET_ONE_PAPERS_SUCCESS,
  GET_ONE_PAPERS_FAIL,
  RESET_PAPERS_STATE,
  CREATE_PAPER_REQUEST,
  CREATE_PAPER_SUCCESS,
  CREATE_PAPER_FAIL,
} from "../types";

import axios from "axios";

// get all papers

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
  return async (dispatch) => {
    try {
      dispatch(getAllPapersRequest());

      const { data } = await axios.get(
        `/papers?title=${querySearch.title}&category=${querySearch.category}&limit=${querySearch.limit}&page=${querySearch.page}`
      );

      dispatch(getAllPaperSuccess(data));
    } catch (error) {
      dispatch(getAllPapersFail(error.response.data.message));
    }
  };
};

//get one paper

const getOnePapersRequest = () => {
  return {
    type: GET_ONE_PAPERS_REQUEST,
  };
};

const getOnePaperSuccess = (paper) => {
  return {
    type: GET_ONE_PAPERS_SUCCESS,
    payload: paper,
  };
};

const getOnePapersFail = (error) => {
  return {
    type: GET_ONE_PAPERS_FAIL,
    payload: error,
  };
};

export const getOnePapers = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getOnePapersRequest());

      const { data } = await axios.get(`/paper/${id}`);

      dispatch(getOnePaperSuccess(data));
    } catch (error) {
      dispatch(getOnePapersFail(error.response.data.message));
    }
  };
};

// create new paper

const createPaperRequest = () => {
  return {
    type: CREATE_PAPER_REQUEST,
  };
};

const createPaperSuccess = (newPaper) => {
  return {
    type: CREATE_PAPER_SUCCESS,
    payload: newPaper,
  };
};

const createPaperFail = (error) => {
  return {
    type: CREATE_PAPER_FAIL,
    payload: error,
  };
};

export const createNewPaper = (dataPaper) => {
  return async (dispatch) => {
    try {
      dispatch(createPaperRequest);

      const { data } = await axios.post("/paper/new", dataPaper, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(createPaperSuccess(data.paper));
    } catch (error) {
      if (error.response) {
        dispatch(createPaperFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

export const resetPapersState = () => {
  return {
    type: RESET_PAPERS_STATE,
  };
};
