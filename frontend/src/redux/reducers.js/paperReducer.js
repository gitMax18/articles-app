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

const initialPapersState = {
  isLoading: true,
  papers: [],
  error: null,
  resPerPage: 0,
  totalResultCount: 0,
};

export const papersReducer = (state = initialPapersState, action) => {
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

export const paperReducer = (state = initialPaperState, action) => {
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
    case RESET_PAPERS_STATE:
      return {
        ...initialPaperState,
      };

    default:
      return state;
  }
};

const initialNewPaperState = {
  isLoading: false,
  isCreated: false,
  paper: {},
  error: null,
};

export const newPaperReducer = (state = initialNewPaperState, action) => {
  switch (action.type) {
    case CREATE_PAPER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PAPER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paper: action.payload,
        error: null,
      };
    case CREATE_PAPER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
