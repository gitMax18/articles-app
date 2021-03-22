import {
  GET_ALL_PAPERS_REQUEST,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_PAPERS_FAIL,
  GET_ONE_PAPERS_REQUEST,
  GET_ONE_PAPERS_SUCCESS,
  GET_ONE_PAPERS_FAIL,
  RESET_PAPERS_STATE,
  RESET_PAPER_STATE,
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
} from "../types";

const initialPapersState = {
  isLoading: true,
  papers: [],
  error: null,
  resPerPage: 0,
  totalResultCount: 0,
};

export const getPapersReducer = (state = initialPapersState, action) => {
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
        papers: action.payload.papers,
        error: null,
        resPerPage: action.payload.resPerPage,
        totalResultCount: action.payload.totalResultCount,
      };
    case GET_ALL_PAPERS_FAIL:
      return {
        ...state,
        isLoading: false,
        papers: [],
        error: action.payload,
      };
    case RESET_PAPERS_STATE:
      return {
        ...initialPapersState,
      };

    default:
      return state;
  }
};

const initialPaperState = {
  isLoading: true,
  paper: {},
  error: null,
};

export const getPaperReducer = (state = initialPaperState, action) => {
  switch (action.type) {
    case GET_ONE_PAPERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ONE_PAPERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paper: action.payload.paper,
        error: null,
      };
    case GET_ONE_PAPERS_FAIL:
      return {
        ...state,
        isLoading: false,
        paper: {},
        error: action.payload,
      };
    case RESET_PAPER_STATE:
      return {
        ...initialPaperState,
      };

    default:
      return state;
  }
};

const initialNewPaperState = {
  isLoading: false,
  isValidated: false,
  // paper: {},
  error: null,
  message: "",
};

export const managePaperReducer = (state = initialNewPaperState, action) => {
  switch (action.type) {
    case CREATE_PAPER_REQUEST:
    case UPDATE_PAPER_REQUEST:
    case DELETE_PAPER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isValidated: false,
      };
    case CREATE_PAPER_SUCCESS:
    case UPDATE_PAPER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // paper: action.payload.paper,
        isValidated: true,
        error: null,
        message: action.payload.message,
      };

    case DELETE_PAPER_SUCCESS:
      return {
        ...state,
        // paper: {},
        isValidated: true,
        error: null,
        isLoading: false,
        message: action.payload.message,
      };

    case CREATE_PAPER_FAIL:
    case UPDATE_PAPER_FAIL:
    case DELETE_PAPER_FAIL:
      return {
        ...state,
        isValidated: false,
        isLoading: false,
        message: action.payload.message,
        error: action.payload,
      };

    case RESET_NEW_PAPER_STATE:
      return {
        ...initialNewPaperState,
      };
    default:
      return state;
  }
};
