import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { UserTypes } from "../redux/userRedux";
import { RouteTypes } from "../redux/routeRedux";
import { TaskTypes } from "../redux/taskRedux";

/* ------------- Sagas ------------- */
import { fetchLogin, fetchRegister } from "./userSagas";
import { toggleLoginState } from "./routeSagas";
import { fetchTask } from "./taskSagas";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([takeLatest(UserTypes.FETCH_LOGIN, fetchLogin)]);
  yield all([takeLatest(UserTypes.FETCH_REGISTER, fetchRegister)]);

  yield all([takeLatest(RouteTypes.TOGGLE_LOGIN_STATE, toggleLoginState)]);

  yield all([takeLatest(TaskTypes.FETCH_TASK, fetchTask)]);
}
