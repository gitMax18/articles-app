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
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_FAIL,
  RESET_LIKE_STATE,
  ADD_COMMENTARY_REQUEST,
  ADD_COMMENTARY_SUCCESS,
  ADD_COMMENTARY_FAIL,
  UPDATE_COMMENTARY_SUCCESS,
  DELETE_COMMENTARY_SUCCESS,
} from "../types";

const initialPapersState = {
  isLoading: false,
  isUpdated: false,
  papers: [],
  error: null,
  resPerPage: 0,
  totalResultCount: 0,
  message: "",
};

export const getPapersReducer = (state = initialPapersState, action) => {
  switch (action.type) {
    case GET_ALL_PAPERS_REQUEST:
    case CREATE_PAPER_REQUEST:
    case UPDATE_PAPER_REQUEST:
      // case DELETE_PAPER_REQUEST:
      // case ADD_LIKE_REQUEST:
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
        isUpdated: false,
        resPerPage: action.payload.resPerPage,
        totalResultCount: action.payload.totalResultCount,
        message: "",
      };
    case CREATE_PAPER_SUCCESS:
      return {
        isLoading: false,
        isUpdated: true,
        papers: [...state.papers, action.payload.paper],
        error: null,
        message: action.payload.message,
      };
    case UPDATE_PAPER_SUCCESS: {
      const papers = state.papers.map((paper) =>
        paper._id === action.payload.paper._id ? action.payload.paper : paper
      );
      return {
        isLoading: false,
        isUpdated: true,
        papers,
        error: null,
        message: action.payload.message,
      };
    }
    case DELETE_PAPER_SUCCESS: {
      const papers = state.papers.filter((paper) => paper._id !== action.payload.id);
      console.log(papers);
      return {
        isLoading: false,
        isUpdated: true,
        papers: papers,
        error: null,
        message: action.payload.message,
      };
    }
    case ADD_LIKE_SUCCESS: {
      let indexValue;
      let updatedPaper = state.papers.find((paper, index) => {
        indexValue = index;
        return paper._id === action.payload.like.paper;
      });
      updatedPaper.usersLike = [...updatedPaper.usersLike, action.payload.like.user];
      updatedPaper.likesNb++;

      let papers = [...state.papers];
      papers.splice(indexValue, 1, updatedPaper);

      return {
        ...state,
        isLoading: false,
        papers,
        error: null,
        message: action.payload.message,
      };
    }

    case REMOVE_LIKE_SUCCESS: {
      let indexValue;
      let updatedPaper = state.papers.find((paper, index) => {
        indexValue = index;
        return paper._id === action.payload.like.paper;
      });
      updatedPaper.usersLike = updatedPaper.usersLike.filter(
        (like) => like !== action.payload.like.user
      );
      updatedPaper.likesNb--;

      let papers = [...state.papers];
      papers.splice(indexValue, 1, updatedPaper);

      return {
        ...state,
        isLoading: false,
        papers,
        error: null,
        message: action.payload.message,
      };
    }
    case GET_ALL_PAPERS_FAIL:
    case CREATE_PAPER_FAIL:
    case UPDATE_PAPER_FAIL:
    case DELETE_PAPER_FAIL:
    case ADD_LIKE_FAIL:
    case REMOVE_LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: "",
      };

    case RESET_PAPERS_STATE:
      return {
        ...initialPapersState,
        papers: [...state.papers],
      };

    default:
      return state;
  }
};

const initialPaperState = {
  isLoading: true,
  paper: {},
  error: null,
  message: "",
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

    case ADD_COMMENTARY_SUCCESS: {
      let paper = { ...state.paper };
      paper.reviews = [...paper.reviews, action.payload.review];
      paper.reviewsNb++;
      return {
        ...state,
        isLoading: false,
        paper,
        error: null,
        message: action.payload.message,
      };
    }

    case UPDATE_COMMENTARY_SUCCESS: {
      let paper = { ...state.paper };
      const indexValue = paper.reviews.findIndex((review) => {
        return review._id === action.payload.review._id;
      });

      paper.reviews.splice(indexValue, 1, action.payload.review);

      return {
        ...state,
        paper,
        isLoading: false,
        error: null,
        message: action.payload.message,
      };
    }

    case DELETE_COMMENTARY_SUCCESS: {
      let paper = { ...state.paper };

      paper.reviews = paper.reviews.filter((review) => review._id !== action.payload.id);
      paper.reviewsNb--;
      return {
        paper,
        isLoading: false,
        error: null,
        message: action.payload.message,
      };
    }

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
