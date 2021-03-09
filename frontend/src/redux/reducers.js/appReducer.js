import {
  GET_APP_INFOS_REQUEST,
  GET_APP_INFOS_SUCCESS,
  GET_APP_INFOS_FAIL,
} from "../types";

const initialAppState = {
  isLoading: false,
  papersNb: 0,
  usersNb: 0,
  error: null,
};

export const appInfosReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case GET_APP_INFOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_APP_INFOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        papersNb: action.payload.papersNb,
        usersNb: action.payload.usersNb,
        error: null,
      };

    case GET_APP_INFOS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
