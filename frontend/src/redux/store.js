import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectUserReducer } from "./reducers.js/userReducer";
import { paperReducer } from "./reducers.js/paperReducer";

const rootReducer = combineReducers({
  user: connectUserReducer,
  papers: paperReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
