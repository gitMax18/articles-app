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
  UPDATE_PAPER_REQUEST,
  UPDATE_PAPER_SUCCESS,
  UPDATE_PAPER_FAIL,
  DELETE_PAPER_REQUEST,
  DELETE_PAPER_SUCCESS,
  DELETE_PAPER_FAIL,
  RESET_NEW_PAPER_STATE,
  RESET_PAPER_STATE,
} from "../types";

import axios from "axios";

// get all papers

const getAllPapersRequest = () => {
  return {
    type: GET_ALL_PAPERS_REQUEST,
  };
};

const getAllPaperSuccess = (papers) => {
  return {
    type: GET_ALL_PAPERS_SUCCESS,
    payload: papers,
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

export const resetPapersState = () => {
  return {
    type: RESET_PAPERS_STATE,
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
      if (error.response) {
        dispatch(getOnePapersFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

export const resetPaperState = () => {
  return {
    type: RESET_PAPER_STATE,
  };
};

// create new paper

const createPaperRequest = () => {
  return {
    type: CREATE_PAPER_REQUEST,
  };
};

const createPaperSuccess = (data) => {
  return {
    type: CREATE_PAPER_SUCCESS,
    payload: data,
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
      dispatch(createPaperRequest());

      const { data } = await axios.post("/paper/new", dataPaper, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(createPaperSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(createPaperFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

// update paper

const updatePaperRequest = () => {
  return {
    type: UPDATE_PAPER_REQUEST,
  };
};

const updatePaperSuccess = (data) => {
  return {
    type: UPDATE_PAPER_SUCCESS,
    payload: data,
  };
};

const updatePaperFail = (error) => {
  return {
    type: UPDATE_PAPER_FAIL,
    payload: error,
  };
};

export const updatePaper = (dataPaper, id) => {
  return async (dispatch) => {
    try {
      dispatch(updatePaperRequest());

      const { data } = await axios.put(`/paper/${id}`, dataPaper, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(updatePaperSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(updatePaperFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

// delete paper

const deletePaperRequest = () => {
  return {
    type: DELETE_PAPER_REQUEST,
  };
};

const deletePaperSuccess = (data) => {
  return {
    type: DELETE_PAPER_SUCCESS,
    payload: data,
  };
};

const deletePaperFail = (error) => {
  return {
    type: DELETE_PAPER_FAIL,
    payload: error,
  };
};

export const deletePaper = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deletePaperRequest());

      const { data } = await axios.delete(`/paper/${id}`);

      dispatch(deletePaperSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(deletePaperFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};

export const resetNewPaperState = () => {
  return {
    type: RESET_NEW_PAPER_STATE,
  };
};
