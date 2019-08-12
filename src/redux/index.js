import { combineReducers } from "redux";
import configureStore from "./createStore";
import rootSaga from "../sagas";

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    user: require("./userRedux").reducer,
    route: require("./routeRedux").reducer
  });

  return configureStore(rootReducer, rootSaga);
};
