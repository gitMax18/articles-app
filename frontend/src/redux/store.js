import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authUserReducer } from "./reducers.js/authReducer";
import { papersReducer, paperReducer, newPaperReducer } from "./reducers.js/paperReducer";
import { getUserReducer } from "./reducers.js/userReducer.js";
import { appInfosReducer } from "./reducers.js/appReducer";

const rootReducer = combineReducers({
  auth: authUserReducer,
  papers: papersReducer,
  paper: paperReducer,
  user: getUserReducer,
  newPaper: newPaperReducer,
  app: appInfosReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
