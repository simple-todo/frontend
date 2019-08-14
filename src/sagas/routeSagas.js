import { put, select } from "redux-saga/effects";

import routeActions from "../redux/routeRedux";

const getLastLoginState = (state) => state.route.isLogin;

// SAGAS
export function* toggleLoginState() {
  const lastLoginState = yield select(getLastLoginState);
  if (!lastLoginState) {
    yield put(routeActions.login());
  } else {
    yield put(routeActions.signOut());
  }
}
