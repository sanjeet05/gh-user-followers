import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import githubReducer from "./containers/Home/Redux/githubReducer";

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  githubReducer,
});

export default createStore(rootReducer, {}, middleware);
