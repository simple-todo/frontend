import { put, call, select } from "redux-saga/effects";

import userActions from "../redux/userRedux";
import routeActions from "../redux/routeRedux";
import api from "../services/api";

// API
export function fetchLoginApi(username, password) {
  return api
    .create()
    .login(username, password)
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

export function fetchRegisterApi(username, password, full_name) {
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
  const response = yield fetchLoginApi(username, password);
  console.log("response fetch login: ", response);

  if (response.data !== null && response.status === 200) {
    const { user, token, success, message } = response.data;

    if (success) {
      yield put(userActions.loginRequestSuccess(user, token));
      yield put(routeActions.toggleLoginState());
    } else {
      // If User wrong username or password, we handle it too here
      yield put(userActions.userRequestError(message));
    }
  } else {
    const error = response.errors[0].message || "Bad Connection";
    yield put(userActions.userRequestError(error));
  }
}

export function* fetchRegister({ username, password, full_name }) {
  yield put(userActions.userRequest());
  const response = yield fetchRegisterApi(username, password, full_name);
  console.log("response fetch register: ", response);
  if (response.data !== null && response.status === 200) {
    const { success, message } = response.data;

    if (success) {
      yield put(userActions.registerRequestSuccess(message));
    } else {
      // If username already registered, we handle it too here
      yield put(userActions.userRequestError(message));
    }
  } else {
    const error = response.errors[0].message || "Bad Connection";
    yield put(userActions.userRequestError(error));
  }
}
