import {
  GET_APP_INFOS_REQUEST,
  GET_APP_INFOS_SUCCESS,
  GET_APP_INFOS_FAIL,
} from "../types";
import axios from "axios";

const getAppInfosRequest = () => {
  return {
    type: GET_APP_INFOS_REQUEST,
  };
};

const getAppInfosSuccess = (appData) => {
  return {
    type: GET_APP_INFOS_SUCCESS,
    payload: appData,
  };
};

const getAppInfosFail = (error) => {
  return {
    type: GET_APP_INFOS_FAIL,
    payload: error,
  };
};

export const getAppInfos = () => {
  return async (dispatch) => {
    try {
      dispatch(getAppInfosRequest());

      const { data } = await axios.get("/app/infos");

      dispatch(getAppInfosSuccess(data));
    } catch (error) {
      if (error.response) {
        dispatch(getAppInfosFail(error.response.data.message));
      } else {
        console.log(error);
      }
    }
  };
};
