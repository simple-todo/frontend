import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { UserTypes } from "../redux/userRedux";
import { RouteTypes } from "../redux/routeRedux";

/* ------------- Sagas ------------- */
import { fetchUser } from "./userSagas";
import { toggleLoginState } from "./routeSagas";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([takeLatest(UserTypes.FETCH_USER, fetchUser)]);

  yield all([takeLatest(RouteTypes.TOGGLE_LOGIN_STATE, toggleLoginState)]);
}
