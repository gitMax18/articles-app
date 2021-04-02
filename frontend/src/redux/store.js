import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authUserReducer } from "./reducers.js/authReducer";
import {
  getPapersReducer,
  getPaperReducer,
  managePaperReducer,
} from "./reducers.js/paperReducer";
import { getUserReducer } from "./reducers.js/userReducer.js";
import { appInfosReducer } from "./reducers.js/appReducer";
import likeReducer from "./reducers.js/likeReducer";

const rootReducer = combineReducers({
  auth: authUserReducer,
  papers: getPapersReducer,
  paper: getPaperReducer,
  user: getUserReducer,
  newPaper: managePaperReducer,
  app: appInfosReducer,
  like: likeReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
