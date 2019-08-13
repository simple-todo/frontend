import { put, call, select } from "redux-saga/effects";

import taskActions from "../redux/taskRedux";
import api from "../services/api";

// API
export function fetchTaskApi({ token }) {
  return api
    .create()
    .getTask(token)
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

// SAGAS
export function* fetchTask({}) {
  console.log("fetchTask jalan");

  yield put(taskActions.taskRequest());
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJheWFtIiwicGFzc3dvcmQiOiIkMmEkMTAkMDRJV3NmLzVsNmMuaENHUDJzRldVZWwva0suTEpkWmc1NDNHMFl5bU5hQ2trRzBQUlhpTkciLCJmdWxsX25hbWUiOiJqb2tvIiwiaWF0IjoxNTY1NjM2OTIxLCJleHAiOjE1NjU3MjMzMjF9.UK9OxhnsTkeiUgyTcB8rGQ_0m_LLVYEksrzHbQXuKKc";
  const response = yield call(fetchTaskApi, { token });
  console.log("response: ", response);

  if (response !== null && response.status === 200) {
    const { data } = response.data;
    yield put(taskActions.taskRequestSuccess(data));
  } else {
    const error = response.message || "Bad Connection";
    yield put(taskActions.taskRequestError(error));
  }
}
