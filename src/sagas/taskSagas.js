import { put, call, select } from "redux-saga/effects";
import axios from "axios";
import taskActions from "../redux/taskRedux";
import api from "../services/api";

const getToken = (state) => state.user.token;

// API
export function fetchTaskApi(token) {
  return api
    .create()
    .getTask(token)
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

export function fetchAddTaskApi({ token, task }) {
  return axios
    .post(
      `https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev/api/todo-management/todos`,
      { task },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    )
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

export function fetchDeleteTaskApi({ token, todo_id }) {
  // NOTE: I dont know why, APISAUCE will stop actions when use DELETE method
  return axios
    .delete(`https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev/api/todo-management/todos`, {
      headers: { Authorization: token },
      data: { todo_id },
    })
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

export function fetchUpdateTaskApi({ token, todo_id }) {
  // NOTE: Same with delete method, i cant use APISAUCE to.. dont know why
  return axios
    .put(
      `https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev/api/todo-management/todos`,
      { todo_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    )
    .then((response) => response.data)
    .then((responseBody) => responseBody)
    .catch((error) => error);
}

// SAGAS
export function* fetchTask() {
  yield put(taskActions.taskRequest());
  const token = yield select(getToken);
  const response = yield fetchTaskApi(token);
  console.log("response fetchTask: ", response);

  if (response !== null && response.status === 200) {
    const { data } = response.data;
    yield put(taskActions.taskRequestSuccess(data));
  } else {
    const error = response.message || "Bad Connection";
    yield put(taskActions.taskRequestError(error));
  }
}

export function* fetchDeleteTask({ todo_id }) {
  yield put(taskActions.taskRequest());
  const token = yield select(getToken);
  todo_id = String(todo_id);
  const response = yield call(fetchDeleteTaskApi, { token, todo_id });
  console.log("response delete ", response);

  if (response !== null && response.status === 200) {
    const { message } = response.data;
    yield put(taskActions.deleteTaskRequestSuccess(message));
  } else {
    const error = response.message || "Bad Connection";
    yield put(taskActions.taskRequestError(error));
  }
}

export function* fetchUpdateTask({ todo_id }) {
  yield put(taskActions.taskRequest());
  const token = yield select(getToken);
  todo_id = String(todo_id);
  const response = yield call(fetchUpdateTaskApi, { token, todo_id });
  console.log("response update ", response);

  if (response !== null && response.status === 200) {
    const { message } = response.data;
    yield put(taskActions.updateTaskRequestSuccess(message));
  } else {
    const error = response.message || "Bad Connection";
    yield put(taskActions.taskRequestError(error));
  }
}

export function* fetchAddTask({ task }) {
  yield put(taskActions.taskRequest());
  const token = yield select(getToken);
  const response = yield call(fetchAddTaskApi, { token, task });
  console.log("response add ", response);

  if (response !== null && response.status === 200) {
    const { message } = response.data;
    yield put(taskActions.addTaskRequestSuccess(message));
  } else {
    const error = response.message || "Bad Connection";
    yield put(taskActions.taskRequestError(error));
  }
}
