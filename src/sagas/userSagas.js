import { put, call, select } from "redux-saga/effects";
import axios from "axios";

import userActions from "../redux/userRedux";
import routeActions from "../redux/routeRedux";
import api from "../services/api";

// API
export function fetchLoginApi({ username, password }) {
  return api
    .create()
    .login(username, password)
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

export function fetchRegisterApi({ username, password, full_name }) {
  return api
    .create()
    .register(username, password, full_name)
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

// SAGAS
export function* fetchLogin({ username, password }) {
  yield put(userActions.userRequest());
  const response = yield call(fetchLoginApi, { username, password });
  console.log("response: ", response);

  if (response !== null) {
    const { user, token } = response.data;
    yield put(userActions.loginRequestSuccess(user, token));
    yield put(routeActions.toggleLoginState());
  } else {
    const error = response.message || "Bad Connection";
    yield put(userActions.userRequestError(error));
  }
}

export function* fetchRegister({ username, password, full_name }) {
  yield put(userActions.userRequest());
  const response = yield call(fetchRegisterApi, { username, password, full_name });
  console.log("response: ", response);

  if (response.data !== null) {
    const { success, message } = response.data;
    if (success) {
      yield put(userActions.registerRequestSuccess(message));
    } else {
      yield put(userActions.userRequestError(message));
    }
  } else {
    const error = response.message || "Bad Connection";
    yield put(userActions.userRequestError(error));
  }
}
